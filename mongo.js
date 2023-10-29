const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const foodProSchema = mongoose.Schema({
    porName: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 22,
        validate(productName) {
            let regularExpress = /^[a-zA-Z ]*$/.test(productName);
            !regularExpress ? console.log("error") : productName
        }
    },
    proItem: {
        type: Number,
        validate(item) {
            if (item > 0 && item <= 50) {
                return item
            } else {
                console.log("error for productItem")
            }
        }
    },
    productPrice: {
        type: Number,
        validate(proPrice) {
            if (proPrice >= 20 && proPrice <= 900) {
                return proPrice
            }
        }
    },
    proPopularity: {
        type: String,
        validate(popularity) {

        }

    },
    proContent: {
        type: String,
        enum: ["bread", 'jam', 'milk', "corn weight chikki", 'bread and potato']
    },
}, { _id: false })

const foodProListmodel = new mongoose.model('productList', foodProSchema);

module.exports = {mongo : mongoose,exp : express,path : path,foodProListmodel};
