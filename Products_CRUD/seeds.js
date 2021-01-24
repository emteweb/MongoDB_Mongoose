//we create a separate file and we can run it independently of the main app just to seed the database:

const mongoose = require('mongoose');
// we import the Product model from another file
const Product = require('./Models/product')

mongoose.connect('mongodb://localhost:27017/productDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Successfully connected to MongoDB')
})
.catch(err=>{
    console.log('DB connection failed');
    console.log(err)
})

/* const p = new Product({
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit'
})
p.save()
.then(p => {
    console.log(p)
}).catch(err => {
    console.log(err)
}) */

const seedProduct = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable',
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit',
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit',
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable',
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy',
    },
]

Product.insertMany(seedProduct)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
});