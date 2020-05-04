const express = require('express');
require('express-async-errors');

const Sentry = require('@sentry/node');
const Youch = require('youch');
const cors = require('cors');
const routes = require('./routes');
const response = require('./middlewares/response');

require('./bootstrap');
require('./database');

class App {
  constructor() {
    Sentry.init({ dsn: process.env.DSN });
    this.server = express();
    this.midllewares();
    this.routes();
    this.exceptionHandler();
  }

  midllewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(response);
  }

  routes() {
    this.server.use('/api', routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // eslint-disable-next-line no-unused-vars
    this.server.use(async (err, req, res, next) => {
      if (err.name === 'HttpError') {
        res.error(err.message, err.code);
      } else if (process.env.NODE_ENV !== 'prod') {
        const { error } = await new Youch(err, req).toJSON();

        res.error(error.message);
      } else {
        res.error('Ops! Erro no servidor, já estamos trabalhando para corrigir!');
      }
    });
  }
}

module.exports = new App().server;
