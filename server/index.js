import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
const app = express();

app.use(bodyParser.json());
app.use(express.json({limit:'1mb'}))
app.use(express.urlencoded({ extended: false}))

app.use((req, res, next) => {
    console.log(req.url + ' : ' + req.body);
    next();
})
app.use(bodyParser.json())
try{
    const conn = await mongoose.connect("mongodb+srv://VisvShah:VisvShah123@cluster0.umuygpo.mongodb.net/?retryWrites=true&w=majority")

    console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch(error) {
    console.log("NOPE");
    console.log(error);
    process.exit(1)
}
app.use('/api/users', userRoutes)
app.listen(4000, () => console.log(`Server started on port ${4000}`))