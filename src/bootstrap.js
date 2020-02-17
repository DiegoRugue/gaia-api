const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? resolve(process.cwd(), '.env.test') : resolve(process.cwd(), '.env'),
});
