const express = require("express");
const cors = require('cors');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3555;
const bodyParser = require("body-parser");

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
  res.send({
    "product": "24",
    "page": 0,
    "count": 5,
    "results": [
      {
        "review_id": 57454,
        "rating": 5,
        "summary": "TEST",
        "recommend": 1,
        "response": null,
        "body": "ETSTLEKSJTLKJSELKTJLKSEJLKJLKJTL:KSJLKTJLKSEJTLKSJL:KJLK",
        "date": "2020-08-22T00:00:00.000Z",
        "reviewer_name": "TEST",
        "helpfulness": 4,
        "photos": []
      },
      {
        "review_id": 57459,
        "rating": 4,
        "summary": "these overalls are too short!!! maybe I am just too tall. ",
        "recommend": 1,
        "response": null,
        "body": "these overalls are too short!!! maybe I am just too tall. Mario, you can wear these",
        "date": "2020-08-22T00:00:00.000Z",
        "reviewer_name": "Luigi",
        "helpfulness": 2,
        "photos": [
          {
            "id": 27152,
            "url": "https://toppng.com/uploads/preview/luigi-nsmbod-super-mario-luigi-11563054900re9hy0bndm.png"
          }
        ]
      },
      {
        "review_id": 57458,
        "rating": 5,
        "summary": "These overalls are the best!!! ",
        "recommend": 1,
        "response": null,
        "body": "they match my red shirt perfectly! let's go save the princess",
        "date": "2020-08-22T00:00:00.000Z",
        "reviewer_name": "Its me! Mario",
        "helpfulness": 1,
        "photos": [
          {
            "id": 27151,
            "url": "https://pngimg.com/uploads/mario/mario_PNG88.png"
          }
        ]
      },
      {
        "review_id": 57455,
        "rating": 5,
        "summary": "pretttyyyyyyyyyy good",
        "recommend": 0,
        "response": null,
        "body": "50 characters?????????????????????/???????????????",
        "date": "2020-08-22T00:00:00.000Z",
        "reviewer_name": "yes",
        "helpfulness": 0,
        "photos": []
      },
      {
        "review_id": 57457,
        "rating": 1,
        "summary": "sgsdfgsdfg",
        "recommend": 1,
        "response": null,
        "body": "sdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgadfg",
        "date": "2020-08-22T00:00:00.000Z",
        "reviewer_name": "new review ",
        "helpfulness": 0,
        "photos": []
      }
    ]
  })
})

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
  res.sendStatus(201);
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
