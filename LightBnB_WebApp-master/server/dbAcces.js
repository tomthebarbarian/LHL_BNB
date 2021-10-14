const { Pool } = require('pg');

// Pool Closure for other function
const pool = new Pool({
  user: 'tomzhang',
  password: '',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = {
  query : (text, params) => {
    return pool.query(text, params);
  }
};