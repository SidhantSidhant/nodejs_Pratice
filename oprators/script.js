const mongoose = require("mongoose");
const express = require("express");


mongoose.connect("mongodb://localhost:27017/skBookList")
.then(()=>{console.log("database connectd successful")})
.catch(()=>{
    console.log("error")
})
const routerss = express();


const bookListSchema = mongoose.Schema({
    author : String,
    price : String,
    rating : Number,
    bookName : String,
}) 

const bookListmodel =new mongoose.model('playList', bookListSchema);


async function dataBaseConnection(){
    try{
        let rkNBook =new bookListmodel({
            author : "R.K. Narayan",
            bookName : "The Guide",
            rating : 8,
            price : 1000,
        })

        let rbNBook =new bookListmodel({
            author : "Rabindranath Tagore",
            bookName : "Poet",
            rating : 5,
            price : 3000,
        })
        let ltNBook =new bookListmodel({
            author : "Anna Karenina",
            bookName : "The Guide",
            rating : 8,
            price : 7000,
        })
        let agNBook =new bookListmodel({
            author : "Amitav Ghosh",
            bookName : "The Guide",
            rating : 6,
            price : 6000,
        })

       let result =await bookListmodel.insertMany([rkNBook,agNBook,ltNBook,rbNBook])
    }catch(err){
        console.log(err);
    }
}

// dataBaseConnection();

routerss.get("/", async (req,res)=>{
    let data =await bookListmodel.find({price : {$lte : 3000}}).select({bookName : 1}).limit(100);
     res.send(data);
})

async function updateDocument(_id){
    let update = await bookListmodel.findByIdAndUpdate({_id},{
        author : "sidhant",
        bookName : "Guide",
        rating : 0,
        price : 100,
    },{
        new : true,
        useFindAndModify : false
    }) 
}
updateDocument("65394a406da0da64de3f5b1b")

routerss.listen("4000");