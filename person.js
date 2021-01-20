const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopAppDb', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Successfully connected to DB')
})
.catch(err=>{
    console.log('DB connection failed');
    console.log(err)
})

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function(){
    return `${this.first} ${this.last}`
})

const Person = mongoose.model('Person', personSchema);
