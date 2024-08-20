const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database connection setup
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "your_database"
});

connection.connect();

// Handle AJAX request to add product to cart
app.post("/add-to-cart", (req, res) => {
    const productId = req.body.productId;
    const productPrice = req.body.productPrice;

    const query = "INSERT INTO carts (product_id, price) VALUES (?, ?, ?)";
    connection.query(query, [productId, productPrice], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error adding to cart." });
        } else {
            res.status(200).json({ message: "Added to cart successfully." });
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
