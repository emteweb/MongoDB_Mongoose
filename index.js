const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Successfully connected to DB')
})
.catch(err=>{
    console.log('DB connection failed');
    console.log(err)
})

// defining a Schema (concept on the Javascript side)
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    review: Number,
    rating: String
});

//we tell Mongoose to create a model for the schema
// we pass in 2 strings: name of the Model and name of the Schema

const Movie = mongoose.model('Movie',movieSchema); // this the Model class 
                                                    // (now we can create new instances of the Movie class 
                                                    // and save it to the database)
//const amadeus = new Movie({title: 'Amadeus', year: 1984, review: 9.2, rating: 'R'}); 

// ---insertMany()--- a model method that returns a Promise (no need to save to DB after the code is run)

/* Movie.insertMany([
    {title: 'Amelie', year: 2001, review: 8.3, rating: 'R'},
    {title: 'Alien', year: 1979, review: 7.9, rating: 'R'},
    {title: 'Iron Giant', year: 1999, review: 7.5, rating: 'PG'},
    {title: 'Stand By Me', year: 1986, review: 8.6, rating: 'R'},
    {title: 'Moonrise Kingdom', year: 2012, review: 7.3, rating: 'PG-13'},
])
.then(data => {
    console.log('It worked!')
    console.log(data)
})
.catch(err => {
    console.log('Failed to fetch data!')
    console.log(err)
}) */