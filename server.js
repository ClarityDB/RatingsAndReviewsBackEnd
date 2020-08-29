const express = require("express");
const cors = require('cors');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3555;
const bodyParser = require("body-parser");

const { getReviews, addReview } = require('./queries');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use('/:productId', express.static(path.join(__dirname, "./client/dist")));

// GET /reviews/:product_id/list
// Returns a list of reviews for a particular product. This list does not include any reported reviews.
app.get('/reviews/:product_id/list', (req, res) => {
  // console.log("req.params in list route", req.params);
  // console.log("req.query in list route: ", req.query);
  getReviews()
    .then((data) => res.send(data))
    .catch((err) => res.err(err));
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
  // console.log("req.body using bodyparser on review being added: ", req.body);
  const dummyReview = {
      product_id: '1',
      rating: 4,
      date: '2020-08-28',
      summary: 'okay product',
      body: 'this was actually a so-so product',
      recommend: true,
      reported: false,
      reviewer_name: 'irene',
      reviewer_email: 'irene@irene.com',
      response: 'no response',
      helpfulness: true
  }
  addReview(dummyReview);
  // res.sendStatus(201);
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
