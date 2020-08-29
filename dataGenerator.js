var faker = require('faker');
var fs = require('fs');

const writeStream = fs.createWriteStream('./reviews.txt', {
  flags: 'a'
});

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const generateReview = () => {
  return {
    product_id: random(1, 100000),
    rating: random(1, 5),
    date: faker.date.between('2020-06-09', '2020-09-09'),
    "summary": faker.random.words(),
    body: faker.lorem.paragraph(),
    recommend: (Math.random() >= .3),
    reported: (Math.random() >= .9),
    reviewer_name: faker.name.findName(),
    reviewer_email: faker.internet.email(),
    response: "",
    helpfulness: random(0, 30)
  }
}

for(var i = 0; i < 10; i++) {
  writeStream.write(JSON.stringify(generateReview())+"\n");
};