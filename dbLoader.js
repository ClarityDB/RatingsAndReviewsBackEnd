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

let startReviewsTruncateTime;
let endPhotosLoad;
const loadReviews = () => {
  startReviewsTruncateTime = new Date;
  let endReviewsTruncateTime;
  let queryString = `TRUNCATE TABLE reviews CASCADE`

  pool
    .query(queryString)
    .then(() => {
      endReviewsTruncateTime = new Date;
      console.log("\nreviews truncation took", (endReviewsTruncateTime - startReviewsTruncateTime) + 'ms');
      copyReviews();
    })
    .catch((err) => console.log("truncate error: ", err));

  const copyReviews = () => {
    let startReviewsLoad = new Date;
    let endReviewsLoad;
    let pathName = path.join(__dirname, '/dataToBeLoaded/reviews.csv');

    // let queryTruncateString = `TRUNCATE TABLE reviews_photos CASCADE;`

    let queryString = `COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
      FROM '${pathName}'
      DELIMITER ','
      CSV HEADER;`

    pool
      .query(queryString)
      .then((response) => {
        endReviewsLoad = new Date;
        console.log(`loaded ${response.rowCount} review rows in ${(endReviewsLoad - startReviewsLoad)} ms
        ` )
    })
      .catch((err) => console.log("get reviews error: ", err));
  }
}

const loadCharacteristics = () => {
  let startCharacteristicsTruncateTime = new Date;
  let endCharacteristicsTruncateTime;
  let queryString = `TRUNCATE TABLE characteristics_reviews CASCADE`

  pool
    .query(queryString)
    .then(() => {
      endCharacteristicsTruncateTime = new Date;
      console.log("\ncharaceteristics truncation took", (endCharacteristicsTruncateTime - startCharacteristicsTruncateTime) + 'ms');
      copyCharacteristics();
    })
    .catch((err) => console.log("truncate error: ", err));

  const copyCharacteristics = () => {
    let startCharacteristicsLoad = new Date;
    let endCharacteristicsLoad;
    let pathName = path.join(__dirname, '/dataToBeLoaded/characteristics_reviews.csv');

    let queryString = `COPY characteristics_reviews(id, characteristics_name, review_id, value)
      FROM '${pathName}'
      DELIMITER ','
      CSV HEADER;`

    pool
      .query(queryString)
      .then((response) => {
        endCharacteristicsLoad = new Date;
        console.log(`loaded ${response.rowCount} characteristics rows in ${(endCharacteristicsLoad - startCharacteristicsLoad)} ms
        ` )
    })
      .catch((err) => console.log("get reviews error: ", err));
  }
}

const loadPhotos = () => {
  let startPhotosTruncateTime = new Date;
  let endPhotosTruncateTime;
  let queryString = `TRUNCATE TABLE reviews_photos CASCADE`

  pool
    .query(queryString)
    .then(() => {
      endPhotosTruncateTime = new Date;
      console.log("\nphotos truncation took", (endPhotosTruncateTime - startPhotosTruncateTime) + 'ms');
      copyPhotos();
    })
    .catch((err) => console.log("truncate error: ", err));

  const copyPhotos = () => {
    let startPhotosLoad = new Date;
    let pathName = path.join(__dirname, '/dataToBeLoaded/reviews_photos.csv');

    let queryString = `COPY reviews_photos(id, review_id, url)
      FROM '${pathName}'
      DELIMITER ','
      CSV HEADER;`

    pool
      .query(queryString)
      .then((response) => {
        endPhotosLoad = new Date;
        console.log(`loaded ${response.rowCount} photo rows in ${(endPhotosLoad - startPhotosLoad)} ms
        ` )
        if (response) {
          console.log(`total load time ${endPhotosLoad - startReviewsTruncateTime} ms`);
        }
    })
      .catch((err) => console.log("get reviews error: ", err));
  }
}

loadReviews();
loadCharacteristics();
loadPhotos();
