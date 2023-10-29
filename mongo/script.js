const mongoose = require("../mongo").mongo;

mongoose.connect("mongodb://localhost:27017/table", {
    useNewUrlParser: true,
}).then(() => console.log('successfull to connect')).catch(err => console.log(err));

const tableSchemaList = mongoose.Schema({
    name: String,
    lname: String,
    email: String,
    contact: String,
})

const tableModel = new mongoose.model('table', tableSchemaList);

async function tableDataConnection() {
    try {

        const tableConnection = new tableModel({
            name: 'sidhant',
            lname: "kulkarni",
            email: "sidhantkulkarni27@gmail.com",
            contact: 9075870330,
        })
        const data = await tableConnection.save();
        console.log(data);

    } catch (err) {
        console.log(err);
    }
}

tableDataConnection()
