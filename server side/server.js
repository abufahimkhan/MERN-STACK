//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS

const app = express();
const Contact = require('./ContactModel');

app.use(cors());  // Enable CORS
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Phonebook')

//getting data from database to pass to the componenet
app.get('/getData',async(request,response)=>{
    try{
        const data=await Contact.find()
        console.log(data); // Log the data to the console
        response.json(data);
    }catch(error){
        console.log('Error fetching data from MongoDB',error);
        response.status(500).json({error:'Internal Server Error'});
    }
})

//saving data to database
app.post('/saveContact', async (request, response) => {
    const { firstname, lastname, phone } = request.body;
    try {
        const newContact = new Contact({
            firstname,
            lastname,
            phone,
        });
        await newContact.save();
        response.json(newContact);
    } catch (error) {
        console.log("Error saving contact to mongoDB", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(3001,(index)=>{
    console.log("server is running on port");
})




















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const Place = require("./PlaceModel"); // Fix the import

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/travelaround"); // Fix the database name

// app.get('/getData', (req, res) => {
//     Place.find()
//         .then(places => res.json(Placecards))
//         .catch(err => res.json(err));
// });

// app.listen(3000, () => {
//     console.log("server is running");
// });
