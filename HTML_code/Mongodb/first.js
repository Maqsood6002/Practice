const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017:testDB', {useNewUrlParser: true,
useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () =>{
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Define a schema for documents
const schema = new mongoose.Schema({
    name: String,
    age: Number
});

//Define a model using the schema
const Person = mongoose.model('Person', schema);

app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');

//Render the insert form
app.get('/insert-form', (req, res) =>{
    res.render('insert');
});

//Create a new document
app.post('/insert', async(req, res) =>{
    try{
        const personData = {
            name: req.body.name,
            age: req.body.age
        };

        const person = new Person(personData);
        await person.save();
        console.log('Inserted: ', person);
        res.redirect('/insert-form');
    }catch(error){
        console.error('Insert Error: ', error);
        res.status(500).send('Error inserting document.');
    }
});

//Delete documents
app.get('/delete', async (req, res) => {
    try{
        await Person.deleteMany({});
        res.send('Documents deleted succesfully.');
    } catch(error){
        console.error(error);
        res.statys(500).send('Error deleting documents.');
    }
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});