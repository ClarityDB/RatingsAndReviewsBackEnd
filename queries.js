const { Pool, Client } = require('pg')
const connectionString = 'postgresql://localhost:5432/reviewsdb?user=ethan&password=ethan';

const pool = new Pool({
  connectionString: connectionString,
})

const getReviews = (res) => {
  // add WHERE to retrieve reviews per product_id
  // when dealing with pagination and count, add LIMIT
  // when testing performance, take limit off to see what happens when asking for all from the set
  let queryString = 'SELECT * FROM reviews';

  return pool
    .query(queryString)
    .then((response) => response.rows)
    .catch((err) => console.log("get reviews error: ", err));
}

const addReview = (reviewObject) => {
  let queryString = 'INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);'

  let values = [reviewObject.product_id, reviewObject.rating, reviewObject.date, reviewObject.summary, reviewObject.body, reviewObject.recommend, reviewObject.reported, reviewObject.reviewer_name, reviewObject.reviewer_email, reviewObject.response, reviewObject.helpfulness];

  pool
    .query(queryString, values)
    .then((res) => console.log("db insertion response: ", res))
    .catch((err) => console.log("db insertion error: ", err))
}

module.exports = {
  getReviews,
  addReview
}