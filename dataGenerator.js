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
fs.writeFileSync('./dataToBeLoaded/reviews.csv', 'id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness \n');

var products = [];
let product_id = 0;
let numberOfReviews = 0;
let characteristicsCounter = 1;
let photoCounter = 1;

let startTime = new Date;
let endTime;
let numberToWrite = 10000000;

let reviews = '';
let characteristics = '';
let photos = '';

while (numberOfReviews < numberToWrite) {
  // generate 4 random characteristics for each product
  let characteristicsToChoose = characteristicsPossiblities.slice();
  randomCharacteristics = [];
  characteristicsCountdown = random(0,5);

  while (characteristicsCountdown > 0) {
    let randomIndex = random(0, characteristicsToChoose.length);
    let randomCharacteristic = characteristicsToChoose[randomIndex];
    randomCharacteristics.push(randomCharacteristic);
    characteristicsToChoose.splice(randomIndex, 1);
    characteristicsCountdown--;
  }

  // populate products array with current product + characteristics
  products[product_id] = {
    product_id: product_id + 1,
    characteristics: randomCharacteristics
  };

  let randomReviewAmount = random(0, 10);
  for (var i = 0; i <= randomReviewAmount; i++) {
    // generate review
    let date = faker.date.between('2020-06-09', '2020-09-09');
    reviews += `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}\n`

    // generate values for this review's characteristics + add to csv
    for (var j = 0; j < products[product_id].characteristics.length; j++) {
      let characteristic = `${characteristicsCounter},${products[product_id].characteristics[j]},${numberOfReviews + 1},${random(1, 6)}\n`
      characteristics += characteristic;
      characteristicsCounter++;
    }

    // generate photos for this review + add to csv
    let photoNumber = random(0, 8);
    for (var a = 0; a < photoNumber; a++) {
      let reviewPhoto = `${photoCounter},${numberOfReviews + 1},${faker.image.imageUrl()}\n`;
      photos += reviewPhoto;
      photoCounter++;
    }
    numberOfReviews++;

    if (numberOfReviews % 1000000 === 0 && reviews.length !== 0) {
      let writeTime = new Date;
      console.log("writing data to csv files after ", (writeTime - startTime).toString(), "ms");
      fs.appendFileSync('./dataToBeLoaded/reviews.csv', reviews);
      reviews = '';
      fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristics);
      characteristics = '';
      fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', photos);
      photos = '';
    }
  }
  product_id++;
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