import express from "express"
import { Book } from "../Models/Book.model.js"

const router = express.Router()

// Create new Route to add new Book
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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

// Routes to delete Book
router.delete("/:id",async(req,res)=>{
    try {
        const { id } = req.params;

        const deleteBook = await Book.findByIdAndDelete(id)

        if(!deleteBook){
            return res.status(404).json({
                message : "Book Not Found"
            })
        }
        return res.status(200).send({
            message : "Book Deleted Successfully"
        })
        
    } catch (error) {
        console.log(`ERROR : ${error.message}`);
        res.status(500).send({
            message : error.message
        })
    }
})

export default router
