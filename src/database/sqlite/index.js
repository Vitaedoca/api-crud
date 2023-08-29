const sqlite3 = require("sqlite3");

const sqlite = require("sqlite");

const path = require("path"); // Manipula os caminhos

async function sqliteConnection() {

    // Abrindo uma conexão com o banco
    const database = await sqlite.open({
        // Definindo o nome do arquivo do banco, resolvendo o caminho relativo
        // (__dirname) vai ser pegar o arquivo absoluto do diretório do arquvio js atual
        filename: path.resolve(__dirname, "..", "database.db"),
        // Definindo o drive de conexão
        driver: sqlite3.Database
    });
    
    return database;
}

module.exports = sqliteConnection;