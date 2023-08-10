const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class UsersController {

    
    async create(request, response) {
        const { name, email, password } = request.body;
        
        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)",[email]);

        if(checkUserExists) {
            throw new AppError("Este e-mail já está em uso.");
        }
        // Cria uma senha criptografada
        const hashedPassword = await hash(password, 8);
        // Executa apenas um comando sql normalmente o insert, update, delete
        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
            
            );
            
            return response.status(201).json();
        }
        
    async update(request, response) {
        // Vai pegar os meus dados enviados no corpor da minha requisição http
        const { name, email, password, old_password } = request.body;
        // Vai pegar o id do cliente na minha roda
        // route params
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user) {
            throw new AppError("Usuário não encontrado");
        }

        const userWithcUpdteEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        // Se encontrar esse e-mail
        if(userWithcUpdteEmail && userWithcUpdteEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga");
        }

        if(password && old_password) {
            // Verifico se a senha antiga que ele informou é realmente a antiga
            // Comparo a antiga digitada com a antiga que está no banco de dados
            const checkOldPassword = await compare(old_password, user.password);

            console.log("Senha antiga fornecida:", old_password);
            console.log("Senha criptografada do banco de dados:", user.password);

            if(!checkOldPassword) {
                throw new AppError("Senha antiga foi informada errada!");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name,user.email, user.password, id]
        );
    
        return response.json();

    }
        
}

module.exports = UsersController;