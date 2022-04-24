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
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "625a77cdd42ed05a1e12b95d",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [85.114913925072, 23.37252198957],
      },
      images: [
        {
          url: "https://res.cloudinary.com/sairev-production/image/upload/v1650742930/YelpCamp/r2ygsds3xj7tqrdm6q9d.jpg",
          filename: "YelpCamp/r2ygsds3xj7tqrdm6q9d",
        },
        {
          url: "https://res.cloudinary.com/sairev-production/image/upload/v1650269427/YelpCamp/ff0cwoxrzqnoqe0hqaug.jpg",
          filename: "YelpCamp/ff0cwoxrzqnoqe0hqaug",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut asperiores saepe esciunt pariatur quas minus quaerat fugiat magnam unde fuga vero, officia maxime nemo molestias accusamus laudantium! Repellendus, laudantium itaque.",
      price,
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
