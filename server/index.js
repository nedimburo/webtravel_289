const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const userRoutes=require('./routes/userRoutes');

const app=express()
app.use(express.json())
app.use(cors())

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