const cors = require("cors");
const express = require("express");
const { MongoClient } = require("mongodb");
// const mongoose = require('mongoose');
require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello world'));
app.use('/images', express.static('images'));
app.use(cors());
app.use(express.json());

const atlasURI = process.env.ATLAS_URI;

const client = new MongoClient(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true });

const startServer = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const db = client.db();
    
    app.get('/api/projects/:category', async (req, res) => {
      const category = req.params.category;
      try {
        const projects = await db.collection("projects").find({ category }).toArray();
        res.json(projects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    })
    // POST route to create a review
    app.post('/api/reviews', async (req, res) => {
      const { name, rating, reviewText } = req.body;
      try {
        await db.collection('reviews').insertOne({ name, rating, reviewText });
        const newReview = await db.collection('reviews').findOne({ name, rating, reviewText });
        console.log(newReview);
        res.status(201).json(newReview);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    });

    // GET route to fetch all reviewss
    app.get('/api/reviews', async (req, res) => {
      try {
        const reviews = await db.collection("reviews").find().toArray();
        res.json(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  }
};

startServer();