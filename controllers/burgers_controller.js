// Establish dependencies
const express = require("express");
const router = express.Router();

// Import the burger model to use its database functions
const burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
    let hbsObject = {  // change variable name?
        burgers: data
    };
    res.render("index", hbsObject);
    });
});

// Check syntax on this one
router.post("/api/burgers", function(req, res) {
    burger.insertOne([
        "burger_name", "Mashed Potato Burger"
    ], [
        req.body.name, req.body.mashedPotatoBurger
    ], function(result) {
        res.json( { id: result.insertId });
    });
});



