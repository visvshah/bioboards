const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000;
const app = express();
const connectDB = async () => {
    try{
        //TODO: set mongoDB database and place in env
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch(error) {
        console.log(error);
        process.exit(1)
    }
}
app.use(bodyParser.json());
app.use(express.json({limit:'1mb'}))
app.use(express.urlencoded({ extended: false}))

app.use((req, res, next) => {
    console.log(req.url + ' : ' + req.body);
    next();
})
app.use(bodyParser.json())
connectDB();
app.use('/api/users', require('./Routes/userRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))