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
  const [selectedContactId, setSelectedContactId] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstname === '' || lastname === '' || phone === '') {
      alert('Field missing!');
      return;
    }

    try {
      if (selectedContactId) {
        // If selectedContactId exists, update the contact
        await axios.put(`http://localhost:3001/updateContact/${selectedContactId}`, {
          firstname,
          lastname,
          phone,
        });
      } else {
        // Otherwise, save a new contact
        await axios.post('http://localhost:3001/saveContact', {
          firstname,
          lastname,
          phone,
        });
      }

      fetchContacts();
      setFirstName('');
      setLastName('');
      setPhone('');
      setSelectedContactId(null); // Reset selectedContactId after updating or adding
    } catch (err) {
      console.log('Error saving contact', err);
    }
  };

  const handleEdit = (contactId) => {
    // Set the selected contact's data to the state for editing
    const selectedContact = entries.find((contact) => contact._id === contactId);
    if (selectedContact) {
      setFirstName(selectedContact.firstname);
      setLastName(selectedContact.lastname);
      setPhone(selectedContact.phone);
      setSelectedContactId(contactId);
    }
  };



  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`http://localhost:3001/deleteContact/${contactId}`);
      fetchContacts();
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
                  <td>
                    <button onClick={() => handleEdit(info._id)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(info._id)}>Delete</button>
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