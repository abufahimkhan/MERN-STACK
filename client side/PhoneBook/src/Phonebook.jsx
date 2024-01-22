import React, { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
import './Phonebook.css'; // Import your CSS file for styling
import axios from 'axios'
export default function Phonebook() {
  const [entries, setEntries] = useState([
    {
      firstname: 'Shanto',
      lastname: 'Khan',
      phone: '01704606893',
    },
  ]);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');


  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getData');
      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async(event) => {
    event.preventDefault();
    if(firstname=='' || lastname=='' || phone==''){
      alert('Field missing!');
      return;
    }
    try{
      await axios.post('http://localhost:3001/saveContact',{
        firstname,
        lastname,
        phone,
      })

      //now fetching data from MongoDB
      fetchContacts();
      
      setFirstName('');
      setLastName('');
      setPhone('');
  
    }catch(err){
      console.log("Error saving contact", err);
    }
  };

  const handleUpdate = (contactId) => {
  
  };
  const handleEdit=()=>{}
  const handleDelete = async (contactId) => {
    // Implement the logic to delete a contact
    // You will need to make a DELETE request to the server
    // Update the URL accordingly
    try {
      await axios.delete(`http://localhost:3001/deleteContact/${contactId}`);

      fetchContacts();  // Fetch updated data after deleting contact
    } catch (err) {
      console.log("Error deleting contact", err);
    }
  };
 
 
  return (
    <div className="container">
      <h1 className="header">PHONE BOOK</h1>
      <div className="box-container">
        <div className="add-contact-box">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstname}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastname}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <button type="submit">Save Contact</button>
          </form>
        </div>
        <div className="contact-list-box">
          <h2>Contact List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((info, index) => (
                <tr key={`${index}`}>
                  <td>{info.firstname}</td>
                  <td>{info.lastname}</td>
                  <td>{info.phone}</td>
                  <td style={{display:'flex',gap:"10px"}}>
                    <button style={{backgroundColor:'GrayText'}} onClick={() => handleEdit(info._id)}>Edit</button>
                    <button style={{backgroundColor:'green'}} onClick={() => handleUpdate(info._id)}>Update</button>
                    <button style={{backgroundColor:'red'}} onClick={() => handleDelete(info._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}