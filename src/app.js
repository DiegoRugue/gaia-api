const express = require('express');
const Sentry = require('@sentry/node');
const Youch = require('youch');
const routes = require('./routes');
const response = require('./middlewares/response');

require('./bootstrap');
require('./database');
require('express-async-errors');

class App {
  constructor() {
    this.server = express();
    this.midllewares();
    this.routes();
  }

  midllewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(response);
  }

  routes() {
    this.server.use('/api', routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // eslint-disable-next-line no-unused-vars
    this.server.use(async (err, req, res, next) => {
      if (err.message && err.code) {
        res.error(err.message, err.code);
      } else if (process.env.NODE_ENV !== 'prod') {
        const errors = await new Youch(err, req).toJSON();

        res.error(500, errors);
      } else {
        res.error(500, 'Ops! Erro no servidor, já estamos trabalhando para corrigir!');
      }
    });
  }
}

module.exports = new App().server;
