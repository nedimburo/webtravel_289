const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const session=require('express-session')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes=require('./routes/userRoutes');

const app=express()
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: "WEBTRAVEL289",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000*60*60*24
    },
}))

mongoose.connect('mongodb://127.0.0.1:27017/dbtravel_289');

app.use("/user", userRoutes);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(3001, ()=>{
    console.log("Server is running on port 3001.");
})