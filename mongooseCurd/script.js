const mongoose = require("../mongo").mongo;
const express = require("../mongo").exp;
const path = require("../mongo").path;

const databaseConnection = async () => {
    try {
        let connectData = await mongoose.connect("mongodb://localhost:27017/foodProductList", {});
    } catch (error) {
        throw new Error("dataBase connection error");
    }
}

databaseConnection();

const foodproListmodel = require("../mongo").foodProListmodel;
const router = express();

router.use(express.json());
router.set("view engine", "ejs");


router.get("/", async (req, res) => {
    let foodProductData = await foodproListmodel.find({});
    console.log(foodProductData);
    res.send(foodProductData);
})

router.listen("8000");
