module.exports = {
  development: {
    database:         process.env.DB_MYSQL_DATABASE,
    username:         process.env.DB_MYSQL_USERNAME,
    password:         process.env.DB_MYSQL_PASSWORD,
    host:             process.env.DB_MYSQL_HOST,
    dialect:          'mysql',
    operatorsAliases: false,
    timezone:         '+00:00'
  },
  test: {
    database:         process.env.DB_MYSQL_DATABASE,
    username:         process.env.DB_MYSQL_USERNAME,
    password:         process.env.DB_MYSQL_PASSWORD,
    host:             process.env.DB_MYSQL_HOST,
    dialect:          'mysql',
    operatorsAliases: false,
    timezone:         '+00:00'
  },
  production: {
    database:         process.env.DB_MYSQL_DATABASE,
    username:         process.env.DB_MYSQL_USERNAME,
    password:         process.env.DB_MYSQL_PASSWORD,
    host:             process.env.DB_MYSQL_HOST,
    dialect:          'mysql',
    operatorsAliases: false,
    timezone:         '+00:00'
  }
}
