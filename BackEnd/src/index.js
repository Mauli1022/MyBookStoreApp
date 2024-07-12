import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app = express()

dotenv.config({
    path : "./.env"
})
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"16kb"}))

const PORT = process.env.PORT || 5000

// Middleware


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
