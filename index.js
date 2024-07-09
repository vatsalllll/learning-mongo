const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // Middleware for parsing JSON bodies

mongoose.connect("mongodb+srv://vatsal:vV5jGcWyciOsrCVC@learningmongodb.xegwcch.mongodb.net/?retryWrites=true&w=majority&appName=LearningMongoDB")
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.error('Failed to connect to db:', err); // Log the error
  });

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_price: {
    type: String,
    required: true
  },
  isInStock: {
    type: Boolean,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

// Create Product
app.post('/api/products', async (req, res) => {
  try {
    const { product_name, product_price, isInStock, category } = req.body;

    const product = await Product.create({
      product_name,
      product_price,
      isInStock,
      category
    });

    console.log(product);
    return res.status(201).json({ message: "Product Created", product });
  } catch (err) {
    console.error('Error creating product:', err);
    return res.status(500).json({ message: "Failed to create product" });
  }
});

// Get Products
app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await Product.find({ isInStock: true });
    return res.json(allProducts);
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Get Product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return res.status(500).json({ message: "Failed to fetch product by ID" });
  }
});

//update product
app.put('.api/products/:id', async(req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body)
    return res.json(updatedProduct)
})
//delete a resource
app.delete('.api/products/:id', async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id, req.body)
    return res.json(deletedProduct)
})
app.listen(8086, () => {
  console.log('Server started at 8086');
});
