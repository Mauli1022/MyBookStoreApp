import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
// Save a new Book with mongoose \\ import Book module
import { Book } from "./Models/Book.model.js"


const app = express()

// ADD middleWare to pars our Body
// app.use(express.json());

dotenv.config({
    path : "./.env"
})
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT = process.env.PORT || 5000

// Create new Route to add new Book
app.post("/books",async(req,res)=>{
    // console.log(req);
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear  ){
            return res.status(400)
            .send({
                message : "SEND ALL REQUEST FIELDS : Title, Author, Publish year"
            })
        }else{

            const newBook = {
                title : req.body.title,
                author : req.body.author,
                publishYear : req.body.publishYear
            }
            const myBook = await Book.create(newBook)

            // console.log(newBook);
            return res.status(201).send(myBook)

        }
    } catch (error) {
        console.log(`ERROR : ${error}`);        
    }
    res.send("SUCCESS")
})

// DataBase Connection 
mongoose.connect(`${process.env.DB_URL}`)
.then(()=>{
    console.log(`DB CONNECT || DB HOST ${mongoose.connection.host}`);
    app.listen(PORT,()=>{
        console.log(`SERVER IS LISTENING ON PORT : ${PORT}`);
    })
})
.catch((error)=>{
    console.log(`Error : ${error}`);
})
