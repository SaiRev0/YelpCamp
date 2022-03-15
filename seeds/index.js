const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => {
    console.log("mongo error");
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random()*20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://picsum.photos/200/300',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut asperiores saepe esciunt pariatur quas minus quaerat fugiat magnam unde fuga vero, officia maxime nemo molestias accusamus laudantium! Repellendus, laudantium itaque.',
      price
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
