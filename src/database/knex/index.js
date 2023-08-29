const config = require("../../../knexfile");

const knex = require("knex");

// Me conectando com o banco de dados
const connection = knex(config.development);

module.exports = connection;