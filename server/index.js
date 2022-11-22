import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({limit:'5mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false}));

app.use(cors());
app.use('/users', userRoutes)
console.log("URL: " + process.env.CONNECTION_URL);
app.listen(4000, () => console.log(`Server started on port ${4000}`));
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(4000, ()=> console.log(`Server runnning on port: 4000`)))
    .catch((error)=> console.log(error.message));