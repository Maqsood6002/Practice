const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a schema for documents
const schema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Define a model using the schema
const Person = mongoose.model('Person', schema);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render the insert form
app.get('/insert-form', (req, res) => {
  res.render('insert');
});
// Create a new document
app.post('/insert', async (req, res) => {
  try {
    const personData = {
      name: req.body.name,
      age: req.body.age,
    };

    const person = new Person(personData);
    await person.save();
    console.log('Inserted:', person);
    res.redirect('/insert-form');
  } catch (error) {
    console.error('Insert Error:', error);
    res.status(500).send('Error inserting document.');
  }
});

app.get('/find-sort/:field', async (req, res) => {
  try {
    const sortField = req.params.field; // Get the field to sort by from the URL parameter
    const people = await Person.find({}).sort(sortField); // Apply the sort to the query
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error finding and sorting documents.');
  }
});


// Find documents with a limit
app.get('/find-limit/:limit', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    const people = await Person.find({}).limit(limit);
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error finding documents.');
  }
});

// Delete documents
app.delete('/delete', async (req, res) => {
  try {
    await Person.deleteMany({});
    res.send('Documents deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting documents.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
