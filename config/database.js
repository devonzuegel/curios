const {Sequelize} = require('sequelize-typescript/lib/models/Sequelize')

require('babel-register')

module.exports = {
  development: {
    username: null,
    password: null,
    database: 'curios-web-dev',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
  },
  test: {
    username: null,
    password: null,
    database: 'curios-web-test',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
}
