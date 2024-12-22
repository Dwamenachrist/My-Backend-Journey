// This import the express package
const express = require('express')

// Import mongoose
const mongoose = require('mongoose')

// Import Product
const Product = require('./models/productModel')
// We call the express package
const app = express();

const PORT = 3001;

// Create an app that listens at port 3001
app.listen(PORT, () =>  console.log(`Running Express Sever on PORT ${PORT}!`));

// FOr our app to understand JSON we use medioware
app.use(express.json());

// routes  to get our app on the browser
app.get('/products', async (req, res) =>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// Update a product
app.put('/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Product with ID ${id} not found`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product
app.delete('/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Product with ID ${id} not found`})
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// Install nodemon  npm i nodemon to restart the server after every change
// mongoose to connect our app to the mongoDB
mongoose.connect('mongodb+srv://chrisdb:o6iHAoPMTuIrfUaC@devtaminapi.b1hwm.mongodb.net/?retryWrites=true&w=majority&appName=DevtaminAPI')
.then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log(error)
})
