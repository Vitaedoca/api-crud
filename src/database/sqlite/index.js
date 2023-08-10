const sqlite3 = require("sqlite3");

const sqlite = require("sqlite");

const path = require("path");

async function sqliteConnection() {

    // Abrindo uma conexão com o banco
    const database = await sqlite.open({
        // Definindo o nome do arquivo do banco, .. voltando uma pasta
        filename: path.resolve(__dirname, "..", "database.db"),
        // Definindo o drive de conexão
        driver: sqlite3.Database
    });
    
    return database;
}

module.exports = sqliteConnection;