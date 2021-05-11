const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log("Error Occurred");
        console.log(err);
    })

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60922be1f3453b2238dee9b4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, deserunt ipsam nisi voluptatem neque dignissimos mollitia, obcaecati repellendus praesentium odio laudantium illo atque ad tenetur aspernatur vitae nihil minima fugit?',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzw7wud6u/image/upload/v1620454449/YelpCamp/ah1cxjscp0swjpq3dl2o.jpg',
                    filename: 'YelpCamp/ah1cxjscp0swjpq3dl2o'
                },
                {
                    url: 'https://res.cloudinary.com/dzw7wud6u/image/upload/v1620454449/YelpCamp/wmf5vfw4cbvbdr9r11zz.jpg',
                    filename: 'YelpCamp/wmf5vfw4cbvbdr9r11zz'
                },
                {
                    url: 'https://res.cloudinary.com/dzw7wud6u/image/upload/v1620454449/YelpCamp/yzaghujvdjocz83gizml.jpg',
                    filename: 'YelpCamp/yzaghujvdjocz83gizml'
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })