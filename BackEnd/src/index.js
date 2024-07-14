import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

const app = express()


dotenv.config({
    path: "./.env"
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
/*
app.use(cors({
    origin : "http://localhost:4000",
    methods : ['GET','POST','PUT','DELETE'],
    allowedHeaders : ['Content-Type']
}))
*/

const PORT = process.env.PORT || 5000

// Routes:
// import Book route
import bookRoute from "./Routes/Books.route.js"
app.use("/books", bookRoute)


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
