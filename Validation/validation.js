const mongoose = require("../mongo").mongo;
const express = require("../mongo").exp;
const path = require("../mongo").path;

const router = express();
mongoose.connect("mongodb://localhost:27017/foodProductList", {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("database is connected sucessful")
    }).catch(() => {
        throw new error('database is not connected')
    })

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

const createFoodProductDocument = async () => {
    const pezzPro = new foodProListmodel({
        porName: "sidhant",
        proItem: 2,
        productPrice: 250,
        proPopularity: "99%",
        proContent: "bread"

    })

    const iceCream = new foodProListmodel({
        porName: "ICEcream",
        proItem: 2,
        productPrice: 300,
        proPopularity: "79%",
        proContent: "milk"

    })

    const paniPuri = new foodProListmodel({
        porName: "pani Puri",
        proItem: 10,
        productPrice: 80,
        proPopularity: "98%",
        proContent: "corn weight chikki"
    })

    const pavBhaji = new foodProListmodel({
        porName: "pavBhaji",
        proItem: 5,
        productPrice: 450,
        proPopularity: "100%",
        proContent: "bread and potato"
    })

    const pezzaProdata = await foodProListmodel.insertMany([pezzPro, iceCream, paniPuri]);
    console.log(pezzaProdata);
}

createFoodProductDocument();

const deleteDoucment = async () => {
    let deleteElement = await foodProListmodel.deleteMany({ proItem: 50 })
    console.log(deleteElemen, '104');
}

// deleteDoucment()


const updateOnewithId = async (id) => {
    let updatedElement = await foodProListmodel.findByIdAndUpdate({ _id: id }, {
        porName: "allueBhaji",
        proItem: 9,
        productPrice: 1200,
        proPopularity: "80%",
        proContent: "bread and potato"
    })
    console.log(updatedElement, "118");
}

// updateOnewithId("653d5e325f8c736e8187c507");