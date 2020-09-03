var faker = require('faker');
var fs = require('fs');

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const characteristicsPossiblities = [
  "size", "width", "comfort", "quality", "length", "fit"
]

// write file syncs to clear the files each time dataGenerator runs
fs.writeFileSync('./dataToBeLoaded/characteristics_reviews.csv', 'id,characteristics_id,review_id,value \n');
fs.writeFileSync('./dataToBeLoaded/reviews_photos.csv', 'id,review_id,url \n');
fs.writeFileSync('./dataToBeLoaded/reviews.csv', 'id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness ');

var products = [];
let product_id = 0;
let numberOfReviews = 0;
let characteristicsCounter = 1;
let photoCounter = 1;

let startTime = new Date;
let endTime;
let numberToWrite = 10000000;

let reviews1 = '';
let characteristics1 = '';
let photos1 = '';

let reviews2 = '';
let characteristics2 = '';
let photos2 = '';

let reviews3 = '';
let characteristics3 = '';
let photos3 = '';

let reviews4 = '';
let characteristics4 = '';
let photos4 = '';

let reviews5 = '';
let characteristics5 = '';
let photos5 = '';

let reviews6 = '';
let characteristics6 = '';
let photos6 = '';

let reviews7 = '';
let characteristics7 = '';
let photos7 = '';

let reviews8 = '';
let characteristics8 = '';
let photos8 = '';

let reviews9 = '';
let characteristics9 = '';
let photos9 = '';

let reviews10 = '';
let characteristics10 = '';
let photos10 = '';

while (numberOfReviews < numberToWrite) {
  // generate 4 random characteristics for each product
  let characteristicsToChoose = characteristicsPossiblities.slice();
  fourRandomCharacteristics = [];
  countdown = 3;

  while (countdown >= 0) {
    let randomIndex = random(0, characteristicsToChoose.length);
    let randomCharacteristic = characteristicsToChoose[randomIndex];
    fourRandomCharacteristics.push(randomCharacteristic);
    characteristicsToChoose.splice(randomIndex, 1);
    countdown--;
  }

  // populate products array with current product + characteristics
  products[product_id] = {
    product_id: product_id + 1,
    characteristics: fourRandomCharacteristics
  };

  let randomReviewAmount = random(0, 10);
  for (var i = 0; i <= randomReviewAmount; i++) {
    // generate review
    let date = faker.date.between('2020-06-09', '2020-09-09');
    if (numberOfReviews / numberToWrite < .1) {
      reviews1 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    } else if (numberOfReviews / numberToWrite < .2) {
      reviews2 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    } else if (numberOfReviews / numberToWrite < .3) {
      reviews3 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    } else if (numberOfReviews / numberToWrite < .4) {
      reviews4 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    } else if (numberOfReviews / numberToWrite < .5) {
      reviews5 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    } else if (numberOfReviews / numberToWrite < .6) {
      reviews6 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    } else if (numberOfReviews / numberToWrite < .7) {
      reviews7 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    } else if (numberOfReviews / numberToWrite < .8) {
      reviews8 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    } else if (numberOfReviews / numberToWrite < .9) {
      reviews9 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    } else if (numberOfReviews / numberToWrite <= 1) {
      reviews10 += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`
    }

    // generate values for this review's characteristics + add to csv
    for (var j = 0; j < products[product_id].characteristics.length; j++) {
      let characteristic = `${characteristicsCounter},${products[product_id].characteristics[j]},${numberOfReviews + 1},${random(1, 6)}\n`

      if (numberOfReviews / numberToWrite < .1) {
        characteristics1 += characteristic;
      } else if (numberOfReviews / numberToWrite < .2) {
        characteristics2 += characteristic;
      } else if (numberOfReviews / numberToWrite < .3) {
        characteristics3 += characteristic;
      } else if (numberOfReviews / numberToWrite < .4) {
        characteristics4 += characteristic;
      } else if (numberOfReviews / numberToWrite < .5) {
        characteristics5 += characteristic;
      } else if (numberOfReviews / numberToWrite < .6) {
        characteristics6 += characteristic;
      } else if (numberOfReviews / numberToWrite < .7) {
        characteristics7 += characteristic;
      } else if (numberOfReviews / numberToWrite < .8) {
        characteristics8 += characteristic;
      } else if (numberOfReviews / numberToWrite < .9) {
        characteristics9 += characteristic;
      } else if (numberOfReviews / numberToWrite <= 1) {
        characteristics10 += characteristic;
      }

      characteristicsCounter++;
    }

    // generate photos for this review + add to csv
    let photoNumber = random(0, 8);
    for (var a = 0; a < photoNumber; a++) {
      let reviewPhoto = `${photoCounter},${numberOfReviews + 1},${faker.image.imageUrl()}\n`;

      if (numberOfReviews / numberToWrite < .1) {
        photos1 += reviewPhoto;
      } else if (numberOfReviews / numberToWrite < .2) {
        photos2 += reviewPhoto;
      } else if (numberOfReviews / numberToWrite < .3) {
        photos3 += reviewPhoto;
      } else if (numberOfReviews / numberToWrite < .4) {
        photos4 += reviewPhoto;
      } else if (numberOfReviews / numberToWrite < .5) {
        photos5 += reviewPhoto;
      } else if (numberOfReviews / numberToWrite < .6) {
        photos6 += reviewPhoto;
      } else if (numberOfReviews / numberToWrite < .7) {
        photos7 += reviewPhoto;
      } else if (numberOfReviews / numberToWrite < .8) {
        photos8 += reviewPhoto;
      } else if (numberOfReviews / numberToWrite < .9) {
        photos9 += reviewPhoto;
      } else if (numberOfReviews / numberToWrite <= 1) {
        photos10 += reviewPhoto;
      }
      photoCounter++;
    }
    numberOfReviews++;
  }
  product_id++;

  if (numberOfReviews / numberToWrite > .1 && reviews1.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews1);
    reviews1 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics1);
    characteristics1 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos1);
    photos1 = '';
  }

  if (numberOfReviews / numberToWrite > .2 && reviews2.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews2);
    reviews2 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics2);
    characteristics2 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos2);
    photos2 = '';
  }

  if (numberOfReviews / numberToWrite > .3 && reviews3.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews3);
    reviews3 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics3);
    characteristics3 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos3);
    photos3 = '';
  }

  if (numberOfReviews / numberToWrite > .4 && reviews4.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews4);
    reviews4 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics4);
    characteristics4 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos4);
    photos4 = '';
  }

  if (numberOfReviews / numberToWrite > .5 && reviews5.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews5);
    reviews5 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics5);
    characteristics5 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos5);
    photos5 = '';
  }

  if (numberOfReviews / numberToWrite > .6 && reviews6.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews6);
    reviews6 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics6);
    characteristics6 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos6);
    photos6 = '';
  }

  if (numberOfReviews / numberToWrite > .7 && reviews7.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews7);
    reviews7 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics7);
    characteristics7 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos7);
    photos7 = '';
  }

  if (numberOfReviews / numberToWrite > .8 && reviews8.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews8);
    reviews8 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics8);
    characteristics8 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos8);
    photos8 = '';
  }

  if (numberOfReviews / numberToWrite > .9 && reviews9.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews9);
    reviews9 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics9);
    characteristics9 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos9);
    photos9 = '';
  }

  if (numberOfReviews / numberToWrite >= 1 && reviews10.length !== 0) {
    fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews10);
    reviews10 = '';
    fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics10);
    characteristics10 = '';
    fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos10);
    photos10 = '';
  }


  // console.log("number of reviews: ", numberOfReviews);
  // console.log("number to write: ", numberToWrite);
};

endTime = new Date;

let totalTime = endTime - startTime;
let reviewsPerMillisecond = numberOfReviews / totalTime;
let reviewsPerSecond = numberOfReviews / totalTime * 1000;
let timeForTenMillion = (10000000 / reviewsPerSecond) / 60 / 60;

console.log(`data generation started at ${startTime} and ended at ${endTime}.
  Total time elapsed: ${totalTime / 1000} seconds
  (${totalTime / 1000 / 60} minutes)
  (${totalTime / 1000 / 60 / 60} hours).

  Total number of reviews generated: ${numberOfReviews}.
  Reviews/ms: ${reviewsPerMillisecond}.
  Reviews/s: ${reviewsPerSecond}.
  10M would take: ${timeForTenMillion} hours.
  `)
console.log("Total time: ", totalTime + " milliseconds");