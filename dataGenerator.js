var faker = require('faker');
var fs = require('fs');
// const { start } = require('repl');

// noah suggested using writefileSync + Appendfile Sync instead of using writeStream - writestream adds too many things to the 'heap', which overloads the volatile memory on the computer, so synchronous activities are better - a little bit slower, but better for computer

// make a forloop that runs 1000000 times, but make 100 batches in that, so that I get updates about how the progress is going, to cut down on anxiety
// use batches to keep up on the progess of the write process

// process will involve writing to 4 different csv files, which are the files that will be loaded into the database


const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const characteristicsPossiblities = [
  "size", "width", "comfort", "quality", "length", "fit"
]

// write characteristics to csv - replace each time

// fs.writeFileSync('./dataToBeLoaded/characteristics.csv', 'csv id/name \n');
fs.writeFileSync('./dataToBeLoaded/reviews.csv', 'id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness \n');
fs.writeFileSync('./dataToBeLoaded/characteristics_reviews.csv', 'id,characteristics_id,review_id,value \n');
fs.writeFileSync('./dataToBeLoaded/reviews_photos.csv', 'id,review_id,url \n');


// for (var i = 0; i < characteristicsPossiblities.length; i++) {
//   fs.appendFileSync('./dataToBeLoaded/characteristics.csv', JSON.stringify(characteristicsPossiblities[i]) + '\n');
// }

// make helper functions to keep loop clean

// generate however many products I need to make 10M review records
var products = [];
let product_id = 0;
let numberOfReviews = 0;
let characteristicsCounter = 1;
let photoCounter = 1;

let startTime = new Date;
let endTime;

while (numberOfReviews <= 1000) {

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

  products[product_id] = {
    product_id: product_id + 1,
    characteristics: fourRandomCharacteristics
  };

  let randomReviewAmount = random(0, 8);

  for (var i = 0; i <= randomReviewAmount; i++) {
    // let product_id = products[i].product_id;
    let date = faker.date.between('2020-06-09', '2020-09-09');
    let review = `${numberOfReviews + 1},${product_id + 1},${random(1, 6)},${date.toString().slice(0, 24)},${faker.random.words()},${faker.lorem.paragraph()},${(Math.random() >= .3)},${false},${faker.name.findName()},${faker.internet.email()},${"none"},${random(0, 30)}`

    for (var j = 0; j < products[product_id].characteristics.length; j++) {
      let characteristic = `${characteristicsCounter},${products[product_id].characteristics[j]},${numberOfReviews + 1},${random(1, 6)}`

      fs.appendFileSync('./dataToBeLoaded/characteristics_reviews.csv', characteristic + '\n');
      characteristicsCounter++;
    }

    let photoNumber = random(0, 8);
    for (var a = 0; a < photoNumber; a++) {
      let reviewPhoto = `${photoCounter},${numberOfReviews + 1},${faker.image.imageUrl()}`;
      fs.appendFileSync('./dataToBeLoaded/reviews_photos.csv', reviewPhoto + '\n');
      photoCounter++;
    }

    fs.appendFileSync('./dataToBeLoaded/reviews.csv', review + '\n');

    console.log("number of reviews: ", numberOfReviews);
    numberOfReviews++;
  }


  endTime = new Date;
  product_id++;
}


let totalTime = endTime - startTime;

console.log(`data generation started at ${startTime} and ended at ${endTime}. Total time elapsed: ${totalTime / 1000} seconds (${totalTime / 1000 / 60} minutes) (${totalTime / 1000 / 60 / 60} hours)`)
console.log("Total time: ", totalTime + " milliseconds");