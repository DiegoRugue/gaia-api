require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  dialectOptions: {
    ssl: true,
  },
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
