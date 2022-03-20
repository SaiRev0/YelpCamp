const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const { all } = require('express/lib/application');

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');


mongoose
	.connect('mongodb://localhost:27017/yelp-camp')
	.then(() => {
		console.log('Mongo Is Running');
	})
	.catch((err) => {
		console.log('mongo error');
	});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);




app.get('/', (req, res) => {
	res.render('home');
});



app.all('*', (req, res, next) =>{
	next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
	const {statusCode = 500} = err;
	if(!err.message) err.message = "Oh No, Something Went Wrong!"
	// res.send('No');
	res.status(statusCode).render('error',{err})
});

app.listen(3000, () => {
	console.log('Its Wroking');
});