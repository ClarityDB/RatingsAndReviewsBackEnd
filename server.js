const express = require("express");
const cors = require('cors');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3555;
const bodyParser = require("body-parser");

const { getReviews, addReview, addCharacteristics, addPhotos, getPhotos, getCharacteristics, markHelpful, report } = require('./queries');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use('/:productId', express.static(path.join(__dirname, "./client/dist")));

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

          // remove any reviews that have been reported
          const withoutReported = []
          for (var i = 0; i < data.results.length; i++) {
            let currentReview = data.results[i];
            if (currentReview.response === 'none') {
              currentReview.response = ''
            }
            if (!currentReview.reported === true) {
              withoutReported.push(currentReview)
            }
          }

          // sort remaining reviews by newest as default response
          withoutReported.sort((a, b) => { return b.date - a.date });
          // sort by helpfulness otherwise
          if (req.query.sort === 'helpful' || req.query.sort === 'relevant') {
            withoutReported.sort((a, b) => { return b.helpfulness - a.helpfulness })
          }
          res.send(withoutReported);
        })
        .catch((err) => console.log("promise all error: ", err));
    })
    .catch((err) => res.send(err))
});

// Returns review metadata for a given product
app.get("/reviews/:product_id/meta", (req, res) => {
  getCharacteristics(req.params.product_id.toString())
    .then((response) => res.send(response))
    .catch((err) => console.log("error getting characteristics: ", err));
})

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

  addReview(reviewToAdd)
    .then((review_id) => {
      addCharacteristics(characteristicsToAdd, review_id)
      for (var i = 0; i < photos.length; i++) {
        addPhotos(photo[i], review_id)
      };
    })
    .catch((err) => res.send(err));
})

// Updates a review to show it was found helpful
app.put("/reviews/helpful/:review_id", (req, res) => {
  markHelpful(req.params)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => err)
})

// Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.
app.put("/reviews/report/:review_id", (req, res) => {
  report(req.params)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => err);
})

app.listen(PORT, () => {
  console.log(`server is running and listening on port ${PORT}`);
});
