const { Pool } = require('pg');
const { response } = require('express');
const connectionString = 'postgresql://localhost:5432/reviewsdb?user=ethan&password=ethan';

const pool = new Pool({
  connectionString: connectionString,
})

const getReviews = (product_id, count, sort) => {
  // when dealing with pagination and count, add LIMIT
  // when testing performance, take limit off to see what happens when asking for all from the set
  let queryString = `SELECT * FROM reviews WHERE product_id = ${product_id} LIMIT ${count}`;

  return pool
    .query(queryString)
    .then((response) => {
      return {
        product_id: product_id,
        count: count,
        sort: sort,
        results: response.rows
      }
    })
    .catch((err) => console.log("get reviews error: ", err));
}

const getPhotos = (review_id) => {
  let queryString = `SELECT * FROM reviews_photos WHERE review_id = ${review_id}`;

  return pool
    .query(queryString)
    .then((response) => { return response.rows })
    .catch((err) => console.log("get reviews error: ", err));
}

const getCharacteristics = (product_id) => {
  let queryStringToGetReviews = `SELECT * FROM reviews WHERE product_id = ${product_id}`;

  return pool
    .query(queryStringToGetReviews)
    .then((response) => {
      let characteristicsPromises = [];
      let characteristicsToProcess = [];
      let responseForClient = {
        product_id: product_id.toString(),
        ratings: {},
        recommended: {},
        characteristics: {}
      }

      for (var i = 0; i < response.rows.length; i++) {
        let currentReview = response.rows[i];

        // write to ratings object
        if (!responseForClient.ratings[currentReview.rating]) {
          responseForClient.ratings[currentReview.rating] = 1;
        } else {
          responseForClient.ratings[currentReview.rating]++
        }

        // write to recommended object
        if (currentReview.recommend === false && !responseForClient.recommended[0]) {
          responseForClient.recommended[0] = 1;
        } else if (currentReview.recommend === false) {
          responseForClient.recommended[0]++;
        } else if (currentReview.recommend === true && !responseForClient.recommended[1]) {
          responseForClient.recommended[1] = 1;
        } else if (currentReview.recommend === true) {
          responseForClient.recommended[1]++;
        }

        let queryStringToGetCharacteristics = `SELECT * FROM characteristics_reviews WHERE review_id = ${currentReview.id}`;
        characteristicsPromises.push(
          pool
            .query(queryStringToGetCharacteristics)
            .then((response) => {
              return response;
            })
            .catch((err) => { return err })
        );
      }
      return Promise.all(characteristicsPromises)
        .then((results) => {
          for (var i = 0; i < results.length; i++) {
            characteristicsToProcess.push(results[i].rows);
          }
          for (var j = 0; j < characteristicsToProcess.length; j++) {
            for (var k = 0; k < characteristicsToProcess[j].length; k++) {
              let individualCharacteristic = characteristicsToProcess[j][k];
              if (!responseForClient.characteristics[individualCharacteristic.characteristics_name]) {
                responseForClient.characteristics[individualCharacteristic.characteristics_name] = individualCharacteristic.value;
              } else {
                responseForClient.characteristics[individualCharacteristic.characteristics_name] += individualCharacteristic.value;
              }
            }
          };
          for (let key in responseForClient.characteristics) {
            responseForClient.characteristics[key] = { value: (responseForClient.characteristics[key] / response.rows.length).toString().slice(0, 5) };
          }
          return responseForClient;
        })
        .catch((err) => { return err });
    })
    .catch((err) => { return err });
}

const addReview = (reviewObject) => {
  let date = reviewObject.date.toString().slice(0, 24);
  let queryString = `SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews)); INSERT INTO reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES(DEFAULT, ${reviewObject.product_id}, '${reviewObject.rating}', '${date}', '${reviewObject.summary}', '${reviewObject.body}', '${reviewObject.recommend}', '${reviewObject.reported}', '${reviewObject.reviewer_name}', '${reviewObject.reviewer_email}', '${reviewObject.response}', '${reviewObject.helpfulness}') RETURNING id;`

  return pool
    .query(queryString)
    .then((res) => { return res[1].rows[0].id })
    .catch((err) => console.log("db insertion error: ", err))
}

const addCharacteristics = (characteristicsObject, review_id) => {
  let characteristics = [];
  for (let key in characteristicsObject.characteristics) {
    characteristics.push([review_id, key, characteristicsObject.characteristics[key]]);
  }

  // doing these in order (not in a loop) because the async aspect of queries causes problems inside a loop (unique id collisions), hence perform next insertion only after previous has completed
  pool
    .query(`SELECT setval('characteristics_reviews_id_seq', (SELECT MAX(id) FROM characteristics_reviews)); INSERT INTO characteristics_reviews(id, review_id, characteristics_name, value) VALUES(DEFAULT, '${characteristics[0][0]}', '${characteristics[0][1]}', '${characteristics[0][2]}')`)
    .then((res) => {

      pool
        .query(`INSERT INTO characteristics_reviews(id, review_id, characteristics_name, value) VALUES(DEFAULT, '${characteristics[1][0]}', '${characteristics[1][1]}', '${characteristics[1][2]}')`)
        .then((res) => {

          pool
            .query(`INSERT INTO characteristics_reviews(id, review_id, characteristics_name, value) VALUES(DEFAULT, '${characteristics[2][0]}', '${characteristics[2][1]}', '${characteristics[2][2]}')`)
            .then((res) => {

              pool
                .query(`INSERT INTO characteristics_reviews(id, review_id, characteristics_name, value) VALUES(DEFAULT, '${characteristics[3][0]}', '${characteristics[3][1]}', '${characteristics[3][2]}')`)
                .then((res) => {

                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));


  for (var i = 0; i < characteristics.length; i++) {
  }
}

// legacy front end does not have addPhoto capability, so I am leaving this undone for now
const addPhotos = (photos, review_id) => {
  // do something, like add photos to photos table in the correct way :)
}

const markHelpful = ({ review_id }) => {
  review_id = parseInt(review_id);
  queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`

  return pool
    .query(queryString)
    .then((response) => response)
    .catch((err) => err);
}

const report = ({ review_id }) => {
  review_id = parseInt(review_id);
  queryString = `UPDATE reviews SET reported = true WHERE id = ${review_id}`

  return pool
    .query(queryString)
    .then((response) => response)
    .catch((err) => err);
}

module.exports = {
  getReviews,
  getPhotos,
  getCharacteristics,
  addReview,
  addCharacteristics,
  addPhotos,
  markHelpful,
  report
}