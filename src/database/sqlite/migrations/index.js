const sqlliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun() {
        // colocando os comandos dentro de um array
        const shemas = [
            createUsers
        ].join('');
    
        try {
            
            const db = await sqlliteConnection();
            // Vai executar o comando shemas 
            // "exec"vários comandos como o create table
            await db.exec(shemas)

        }catch(error){

            console.error(`O correu um error: ${error.message}`);

        }
            
}

module.exports = migrationsRun;