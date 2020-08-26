# ClarityDB Ratings and Review Module

> This repo contains code for the Ratings and Review module of an ecommerce website

## Related Projects

  - https://github.com/ClarityDB/ratings-and-reviews-proxy
  - https://github.com/ClarityDB/ProdDetailsDB
  - https://github.com/ClarityDB/ProdDetails_Proxy

## Table of Contents

1. [Server](#server)
1. [Scripts](#scripts)

## Server

> CRUD Routes
  - GET /qa/questions
  - GET /qa/moreAnswers
  - POST /qa/question/add
  - POST /qa/answer/add
  - PUT /qa/question/helpful
  - PUT /qa/question/report
  - PUT /qa/answer/helpful
  - PUT /qa/answer/report

### Scripts

From within the root directory:

```npm install``` to install dependencies
```npm start``` to run the server on localhost:3555
```npm run build:dev``` for a webpack build that watches changes
```npm run build``` for a production webpack build
