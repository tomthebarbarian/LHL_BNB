const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const {argv} = require('process');

const rawArgs = argv.slice(2);

const pool = new Pool({
  user: 'tomzhang',
  password: '',
  host: 'localhost',
  database: 'lightbnb'
});



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // console.log('in email', `'${email}'`);
  return pool.query(
    `
    SELECT *
    FROM users
    WHERE users.email = $1;
    `
    , [`${email}`]
  ).then(
    (result) => {
      // console.log(result);
      // console.log('returning',result.rows);
      // console.log('returning',result.rows[0].password);
      return result.rows[0];
    }
  ).catch(
    (err) => {
      console.log('returning err', err.message);
      return err.message;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// const getUserWithId = function(id) {
//   return Promise.resolve(users[id]);
// };

const getUserWithId = function(id) {
  return pool.query(
    `
    SELECT *
    FROM users
    WHERE users.id = $1
    `, [`${id}`]
  ).then(
    (result) => {
      // console.log('returning id',result.rows);
      return result.rows[0];
    }
  ).catch(
    (err) => {
      console.log('returning id err', err.message);
      return err.message;
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

// const addUser =  function(user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// };

const addUser =  function(user) {
  return pool.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1,$2,$3)
    RETURNING *;
    `, [user.name, user.email,user.password]
  );
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// };


const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(
      `SELECT *
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      WHERE reservations.guest_id = $1
      LIMIT $2;`,
      [guest_id, limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
      return err.message;
    });
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// };
const getAllProperties = (options, limit = 10) => {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id`;

  // 3
  if (options.city === undefined) {
    options.city = '';
  }
  queryParams.push(`%${options.city}%`);
  queryString += `
  WHERE city LIKE $${queryParams.length} `;

  // Owner_id
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `
    AND properties.owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `
    AND properties.cost_per_night > $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `
    AND properties.cost_per_night < $${queryParams.length} `;
  }

  // 4
  queryString += `
  GROUP BY properties.id`;
  
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);
  
  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
      return err.message;
    });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
// const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// };


const addProperty = function(property) {
  const {owner_id , title , description , thumbnail_photo_url , cover_photo_url , 
    cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms,
    country, street, city, province, post_code} = property;
  
  const queryParams = [owner_id , title , description , thumbnail_photo_url , cover_photo_url , 
    cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms,
    country, street, city, province, post_code];
  console.log(queryParams);
  const queryStr = `
  INSERT INTO properties (
    owner_id , title , description , thumbnail_photo_url , cover_photo_url , 
    cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms, 
    country, street, city, province, post_code)
    VALUES ($1, $2 ,$3, $4, $5, $6, $7, $8, $9, $10, $11 , $12, $13 , $14)
    RETURNING *;
    `;
  return pool
    .query(queryStr, queryParams)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return err.message;
    });
};


exports.addProperty = addProperty;
