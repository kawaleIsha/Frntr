const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
// const mongoose = require('mongoose');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// get driver connection
// const dbo = require("./db/conn");
const atlasURI = process.env.ATLAS_URI;

const client = new MongoClient(atlasURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }
  const db = client.db();

  // POST route to create a review
  app.post('/api/reviews', async (req, res) => {
    const { name, rating, reviewText } = req.body;
    try {
      const result = await db.collection('reviews').insertOne({ name, rating, reviewText });
      const newReview = result.ops[0];
      res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: err.message });
    }
  });

  // GET route to fetch all reviewss
  app.get('/api/reviews', async (req, res) => {
    try {
      const reviews = await db.collection("reviews").find().toArray();
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});