import mongoose from "mongoose";
import express from "express";
import { todo } from "./models/data.js";

const names = ['Maqsood', 'Adnan', 'Rameez', 'Danish', 'Tousif'];
const cities = ['Delhi', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune'];

const app = express();
const port = 4002;  // You can change this to any available port

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todo")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Could not connect to MongoDB', err);
    });

app.get('/', async (req, res) => {
    try {
        const rName = names[Math.floor(Math.random() * names.length)];
        const rIncome = Math.floor(Math.random() * 50001) + 50000;
        const rCity = cities[Math.floor(Math.random() * cities.length)];

        const newTodo = new todo({
            name: rName,
            income: rIncome,
            city: rCity
        });

        const savedTodo = await newTodo.save();
        console.log(savedTodo);

        res.send('Hello World!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please use a different port.`);
    } else {
        console.error(err);
    }
});
