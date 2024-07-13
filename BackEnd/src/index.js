import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
// Save a new Book with mongoose \\ import Book module
import { Book } from "./Models/Book.model.js"


const app = express()

// ADD middleWare to pars our Body
// app.use(express.json());

dotenv.config({
    path: "./.env"
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = process.env.PORT || 5000

// Create new Route to add new Book
app.post("/books", async (req, res) => {
    // console.log(req);
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400)
                .send({
                    message: "SEND ALL REQUEST FIELDS : Title, Author, Publish year"
                })
        } else {

            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear
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

// Create a Route to get all book from the database
app.get("/books", async (req, res) => {
    try {
        const allBooks = await Book.find({});

        return res.status(200).json({
            count: allBooks.length,
            data: allBooks
        })

    } catch (error) {
        console.log(`ERROR ${error.message}`);
        res.status(500).send({
            message: error.message
        })
    }
})

// Get One Book By id with Mongoose:
// Route for get one Book from database by id

app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const oneBook = await Book.findById(id);

        return res.status(200).json({
            count: oneBook.length,
            data: oneBook
        })

    } catch (error) {
        console.log(`ERROR ${error.message}`);
        res.status(500).send({
            message: error.message
        })
    }
})

// Route to Update the Selected Book:
app.put("/books/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400)
                .send({
                    message: "SEND ALL REQUEST FIELDS : Title, Author, Publish year"
                })
        }
            const {id} = req.params;
            const updateBook = await Book.findByIdAndUpdate(id,req.body)

            if(!updateBook){
                return res.status(404).json({message : "Book not Found"})
            }
            return res.status(200).send({
                message : "Book Updated Successfully"
            })
        
    } catch (error) {
        console.log(`ERROR : ${error.message}`);
        res.status(500).send({
            message: error.message
        })
    }
})

// DataBase Connection 
mongoose.connect(`${process.env.DB_URL}`)
    .then(() => {
        console.log(`DB CONNECT || DB HOST ${mongoose.connection.host}`);
        app.listen(PORT, () => {
            console.log(`SERVER IS LISTENING ON PORT : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(`Error : ${error}`);
    })
