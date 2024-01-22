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

//update data
app.put('/updateContact/:id',async(request,response)=>{
    const contactId=request.params.id;
    const {firstname,lastname,phone}=request.body;
    try{
        const updatedContact=await Contact.findByIdAndUpdate(
            contactId,
            {firstname,lastname,phone},
            {new:true}
        );
        if(!updatedContact){
            return response.status(404).json({error:'Contact not found'})
        }


        response.json(updatedContact);

    }catch(error){
        console.log('Error updating contact in MonoDB',error);
        response.status(500).json({error:'Internal Server Error'});
    }
})

// Delete contact by ID
app.delete('/deleteContact/:id', async (request, response) => {
    const contactId = request.params.id;

    try {
        const deletedContact = await Contact.findByIdAndDelete(contactId);

        if (!deletedContact) {
            return response.status(404).json({ error: 'Contact not found' });
        }

        response.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.log('Error deleting contact in MongoDB', error);
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