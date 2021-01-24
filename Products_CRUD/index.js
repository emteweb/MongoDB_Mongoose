const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require("method-override"); //to override the default GET/POST browser methods


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


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
//to override the default GET/POST browser methods
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy', 'fungi'];

app.get('/products', async (req,res) => {
    const {category} = req.query;
    if (category) {
        const products = await Product.find({category});
        res.render('products/index', {products, category})
    } else {
        const products = await Product.find({});
        res.render('products/index', {products, category: 'All'})
    }
})

// template for adding a new product
app.get('/products/new', (req,res) => {
    res.render('Products/new', {categories});
})

// adding a new product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

// displaying details of a product
app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product});
})

// template for editing a product
app.get('/products/:id/edit', async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('Products/edit', {product, categories});
})

app.put('/products/:id', async (req,res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req,res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('Listening on PORT 3000!')
})