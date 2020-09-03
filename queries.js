const { Pool } = require('pg')
const connectionString = 'postgresql://localhost:5432/reviewsdb?user=ethan&password=ethan';

const pool = new Pool({
  connectionString: connectionString,
})

const getReviews = (product_id, count, sort) => {
  // when dealing with pagination and count, add LIMIT
  // when testing performance, take limit off to see what happens when asking for all from the set
  let queryString = `SELECT * FROM reviews WHERE product_id = '${product_id}' LIMIT ${count}`;

  return pool
    .query(queryString)
    .then((response) => {return {
      product_id: product_id,
      count: count,
      sort: sort,
      results: response.rows
      }
    })
    .catch((err) => console.log("get reviews error: ", err));
}

const addReview = (reviewObject) => {
  let queryString = 'INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;'

  let values = [reviewObject.product_id, reviewObject.rating, reviewObject.date, reviewObject.summary, reviewObject.body, reviewObject.recommend, reviewObject.reported, reviewObject.reviewer_name, reviewObject.reviewer_email, reviewObject.response, reviewObject.helpfulness];

  return pool
    .query(queryString, values)
    .then((res) => {return res.rows[0].id})
    .catch((err) => console.log("db insertion error: ", err))
}

const addCharacteristics = (characteristicsObject, review_id) => {
  let queryString = `INSERT INTO characteristics_reviews(review_id, characteristics_id, value) VALUES($1, $2, $3);`

  let characteristics = [];
  for (let key in characteristicsObject.characteristics) {
    characteristics.push([review_id, key, characteristicsObject.characteristics[key]]);
  }

  for (var i = 0; i < characteristics.length; i++) {
    pool
      .query(queryString, characteristics[i])
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}

const addPhotos = (photos, review_id) => {
  // do something, like add photos to photos table in the correct way :)
}

module.exports = {
  getReviews,
  addReview,
  addCharacteristics,
  addPhotos
}