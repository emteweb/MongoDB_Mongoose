const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopAppDb', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Successfully connected to DB')
})
.catch(err=>{
    console.log('DB connection failed');
    console.log(err)
})


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: [0, 'The price must be higher than 0 !!!'] // we can customize our own ERROR message
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L'] // when we use "enum" the values can be only from the options given
    }
})

const Product = mongoose.model('Product', productSchema);


/* const bike = new Product({name: 'Mountain Bike', price: 599});
bike.save()
.then(data => {
    console.log("It worked!")
    console.log(data)
})
.catch(err => {
    console.log('Error occured!')
    console.log(err.errors.name.properties.message)
})

const skateboard = new Product({name: 'Cool Skateboard', price: 54});
skateboard.save()
.then(data => {
    console.log("It worked!")
    console.log(data)
})
.catch(err => {
    console.log('Error occured!')
    console.log(err.errors.name.properties.message)
})

const tirePump = new Product({name: 'Tire pump', price: 19.50});
tirePump.save()
.then(data => {
    console.log("It worked!")
    console.log(data)
})
.catch(err => {
    console.log('Error occured!')
    console.log(err.errors.name.properties.message)
}) */

Product.findOneAndUpdate({name: 'Tire pump'}, {price: 66}, {new: true, runValidators: true})
.then(data => {
    console.log("It worked!")
    console.log(data)
})
.catch(err => {
    console.log('Error occured!')
    console.log(err.errors)
})

// we create a method on a Schema, which can be later used on varoius instances
productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat);
    return this.save();
}

// defining a STATIC method on the Model:

productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0})
}

Product.fireSale().then(res => console.log(res));

/* const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Mountain Bike'});
    // instead of changing the value on a particular instance 
    // we can define a method (see above) on the whole Schema and then use it on different instances

    //foundProduct.onSale = !foundProduct.onSale;
    //foundProduct.save();
    console.log(foundProduct);
    //await foundProduct.toggleOnSale();
    //console.log(foundProduct);
    try{
        foundProduct.addCategory('Outdoors');
        console.log(foundProduct);
    }catch(err){
        console.log(err)
    }
    
} */

//findProduct();