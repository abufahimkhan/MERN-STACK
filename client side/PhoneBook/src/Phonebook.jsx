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
    axios.get('http://localhost:3001/getData')
      .then(response => setEntries(response.data))
      .catch(error => console.log(error));
  }, []);
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(firstname=='' || lastname=='' || phone==''){
      alert('Field missing!');
      return;
    }
    // //fetching and showing data by table
    // axios.get('http://localhost:5173/getData')
    // .then(Response=>setEntries(Response.data))
    // .catch(error=>console.log("error"))
    // const stateValue = { firstname, lastname, phone };
    // setEntries([...entries, stateValue]);
    
     //saving data in MongoDB
    try{
      await axios.post('http://localhost:3001/saveContact',{
        firstname,
        lastname,
        phone,
      })

      //now fetching data from MongoDB
      const response=await axios.get('http://localhost:3001/getData');
      setEntries(response.data);
      setFirstName('');
      setLastName('');
      setPhone('');
  
    }catch(err){
      console.log("Error saving contact", err);
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
