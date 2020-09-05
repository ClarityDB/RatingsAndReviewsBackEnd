const express = require("express");
const cors = require('cors');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3555;
const bodyParser = require("body-parser");

const { getReviews, addReview, addCharacteristics, addPhotos, getPhotos, getCharacteristics } = require('./queries');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use('/:productId', express.static(path.join(__dirname, "./client/dist")));

// GET /reviews/:product_id/list
// Returns a list of reviews for a particular product. This list does not include any reported reviews.
app.get('/reviews/:product_id/list', (req, res) => {
  getReviews(req.params.product_id.toString(), req.query.count, req.query.sort)
    .then((data) => {
      let photos = [];
      for (var i = 0; i < data.results.length; i++) {
        let currentReview = data.results[i];
        photos.push(getPhotos(currentReview.id));
      }
      Promise.all(photos)
        .then((response) => {
          for (var i = 0; i < data.results.length; i++) {
            let currentReview = data.results[i];
            currentReview.photos = [];
            for (var j = 0; j < response.length; j++) {
              if (response[j][0]) {
                if (response[j][0].review_id === currentReview.id.toString()) {
                  currentReview.photos = response[j];
                }
              }
            }
          }
          res.send(data.results);
        })
        .catch((err) => console.log("promise all error: ", err));
    })
    .catch((err) => res.send(err))
});

// GET /reviews/:product_id/meta
// Returns review metadata for a given product
app.get("/reviews/:product_id/meta", (req, res) => {
  // console.log("req.params in meta route", req.params);
  // console.log("req.query in meta route: ", req.query);
  getCharacteristics(req.params.product_id.toString())
    .then((response) => res.send(response))
    .catch((err) => console.log("error getting characteristics: ", err));

  // res.send({
  //   "product_id": "24",
  //   "ratings": {
  //     "1": 2,
  //     "2": 2,
  //     "4": 4,
  //     "5": 14
  //   },
  //   "recommended": {
  //     "0": 3,
  //     "1": 19
  //   },
  //   "characteristics": {
  //     "Fit": {
  //       "id": 78,
  //       "value": "3.7368"
  //     },
  //     "Length": {
  //       "id": 79,
  //       "value": "3.7895"
  //     },
  //     "Comfort": {
  //       "id": 80,
  //       "value": "4.0000"
  //     }
  //   }
  // })
})

// POST /reviews/:product_id
// Adds a review for the given product
app.post("/reviews/:product_id", (req, res) => {
  const reviewToAdd = {
    product_id: req.params.product_id,
    rating: req.body.rating,
    date: new Date(),
    summary: req.body.summary,
    body: req.body.body,
    recommend: req.body.recommend,
    reported: false,
    reviewer_name: req.body.name,
    reviewer_email: req.body.email,
    response: '',
    helpfulness: 0,
  }

  const characteristicsToAdd = {
    characteristics: req.body.characteristics
  }

  const photosToAdd = [];

  console.log("review to add: ", reviewToAdd);
  console.log("characteristics to add: ", characteristicsToAdd);

  addReview(reviewToAdd)
    .then((review_id) => {
      addCharacteristics(characteristicsToAdd, review_id)
      for (var i = 0; i < photos.length; i++) {
        addPhotos(photo[i], review_id)
      };
    })
    .catch((err) => res.send(err));
})

// PUT /reviews/helpful/:review_id
// Updates a review to show it was found helpful
app.put("/reviews/helpful/:review_id", (req, res) => {
  console.log("helpful review: ", req.params);
  res.sendStatus(204);
})

// PUT /reviews/report/:review_id
// Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.
app.put("/reviews/report/:review_id", (req, res) => {
  console.log("reported review:", req.params);
  res.sendStatus(204);
})

app.listen(PORT, () => {
  console.log(`server is running and listening on port ${PORT}`);
});
