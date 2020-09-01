const pg = require('pg');
const { Pool } = require('pg');
const types = pg.types;
types.setTypeParser(1114, function(stringValue) {
  return stringValue;
});
const connectionString = 'postgresql://localhost:5432/reviewsdb?user=ethan&password=ethan';
const path = require('path');

const pool = new Pool({
  connectionString: connectionString,
})

// const loadReviews = () => {

//   let pathName = path.join(__dirname, '/dataToBeLoaded/reviews.csv');

//   let queryString = `COPY reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
//   FROM '${pathName}'
//   DELIMITER ','
//   CSV HEADER;`

//   return pool
//     .query(queryString)
//     .then((response) => console.log("load response: ", response))
//     .catch((err) => console.log("get reviews error: ", err));
// }

const loadReviews = () => {

  let queryString = `TRUNCATE TABLE reviews CASCADE`

  pool
    .query(queryString)
    .then(() => copyReviews())
    .catch((err) => console.log("truncate error: ", err));

  const copyReviews = () => {

    let pathName = path.join(__dirname, '/dataToBeLoaded/reviews.csv');

    // let queryTruncateString = `TRUNCATE TABLE reviews_photos CASCADE;`

    let queryString = `COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
      FROM '${pathName}'
      DELIMITER ','
      CSV HEADER;`

    pool
      .query(queryString)
      .then((response) => console.log("load response: ", response))
      .catch((err) => console.log("get reviews error: ", err));
  }
}

const loadCharacteristics = () => {

  let queryString = `TRUNCATE TABLE characteristics_reviews CASCADE`

  pool
    .query(queryString)
    .then(() => copyCharacteristics())
    .catch((err) => console.log("truncate error: ", err));

  const copyCharacteristics = () => {

    let pathName = path.join(__dirname, '/dataToBeLoaded/characteristics_reviews.csv');

    // let queryTruncateString = `TRUNCATE TABLE reviews_photos CASCADE;`

    let queryString = `COPY characteristics_reviews(id, characteristics_name, review_id, value)
      FROM '${pathName}'
      DELIMITER ','
      CSV HEADER;`

    pool
      .query(queryString)
      .then((response) => console.log("load response: ", response))
      .catch((err) => console.log("get reviews error: ", err));
  }
}

const loadPhotos = () => {

  let queryString = `TRUNCATE TABLE reviews_photos CASCADE`

  pool
    .query(queryString)
    .then(() => copyPhotos())
    .catch((err) => console.log("truncate error: ", err));

  const copyPhotos = () => {

    let pathName = path.join(__dirname, '/dataToBeLoaded/reviews_photos.csv');

    // let queryTruncateString = `TRUNCATE TABLE reviews_photos CASCADE;`

    let queryString = `COPY reviews_photos(id, review_id, url)
      FROM '${pathName}'
      DELIMITER ','
      CSV HEADER;`

    pool
      .query(queryString)
      .then((response) => console.log("load response: ", response))
      .catch((err) => console.log("get reviews error: ", err));
  }
}



// const newPhotoLoad =
//   new Promise(deletePhotos())
//     .then(() => loadPhotos())
//     .catch((err) => console.log("error in photo delete: ", err));
// ;
loadReviews();
loadCharacteristics();
loadPhotos();