const express = require("express");
const cors = require('cors');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3555;
const bodyParser = require("body-parser");

const { getReviews, addReview, addCharacteristics, addPhotos } = require('./queries');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use('/:productId', express.static(path.join(__dirname, "./client/dist")));

// GET /reviews/:product_id/list
// Returns a list of reviews for a particular product. This list does not include any reported reviews.
app.get('/reviews/:product_id/list', (req, res) => {
  // console.log("req.params in list route", req.params);
  // console.log("req.query in list route: ", req.query);

  // getReviews(req.params.product_id.toString(), req.query.count, req.query.sort)
  //   .then((data) => res.send(data))
  //   .catch((err) => res.send(err))

  res.send({
      "product": "1",
      "page": 0,
      "count": 5,
    "results": [
      {
        "review_id": 57431,
        "rating": 1,
        "summary": "First Review",
        "recommend": 0,
        "response": null,
        "body": "First ReviewFirst ReviewFirst ReviewFirst ReviewFirst ReviewFirst ReviewFirst Review",
        "date": "2020-08-18T00:00:00.000Z",
        "reviewer_name": "First Review",
        "helpfulness": 6,
        "photos": []
      },
      {
        "review_id": 57377,
        "rating": 5,
        "summary": "First Review",
        "recommend": 1,
        "response": null,
        "body": "Best Ever",
        "date": "2020-08-12T00:00:00.000Z",
        "reviewer_name": "Iwrote this",
        "helpfulness": 5,
        "photos": []
      },
      {
        "review_id": 57379,
        "rating": 5,
        "summary": "fdafda",
        "recommend": 1,
        "response": null,
        "body": "VADVA",
        "date": "2020-08-12T00:00:00.000Z",
        "reviewer_name": "Me IDid",
        "helpfulness": 2,
        "photos": []
      },
      {
        "review_id": 57419,
        "rating": 4,
        "summary": "testing ",
        "recommend": 1,
        "response": null,
        "body": "hello world over and over hello world over and over hello world over and over hello world over and over hello world over and over",
        "date": "2020-08-16T00:00:00.000Z",
        "reviewer_name": "tester",
        "helpfulness": 1,
        "photos": []
      },
      {
        "review_id": 57402,
        "rating": 5,
        "summary": "testing update ratings on submit",
        "recommend": 1,
        "response": null,
        "body": " update ratings on submit update ratings on submit update ratings on submit update ratings on submit update ratings on submit update ratings on submit update ratings on submit",
        "date": "2020-08-16T00:00:00.000Z",
        "reviewer_name": "this is me",
        "helpfulness": 0,
        "photos": []
      }
    ]
  })
});

// GET /reviews/:product_id/meta
// Returns review metadata for a given product
app.get("/reviews/:product_id/meta", (req, res) => {
  // console.log("req.params in meta route", req.params);
  // console.log("req.query in meta route: ", req.query);
  res.send({
    "product_id": "24",
    "ratings": {
      "1": 2,
      "2": 2,
      "4": 4,
      "5": 14
    },
    "recommended": {
      "0": 3,
      "1": 19
    },
    "characteristics": {
      "Fit": {
        "id": 78,
        "value": "3.7368"
      },
      "Length": {
        "id": 79,
        "value": "3.7895"
      },
      "Comfort": {
        "id": 80,
        "value": "4.0000"
      },
      "Quality": {
        "id": 81,
        "value": "3.8421"
      }
    }
  })
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
      // pick up work here, need to figure out how to add either photos or an empty array
      if (photos.length) {
        addPhotos(photosToAdd, review_id)
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
