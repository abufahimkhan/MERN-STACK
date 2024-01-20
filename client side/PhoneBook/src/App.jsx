import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Phonebook from './Phonebook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Phonebook/>
    </>
  )
}

export default App

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3000/Placecards')
//       .then(response => setCards(response.data))
//       .catch(error => console.log(error));
//   }, []);

//   return (
//     <>
//       <div>
//         {cards.map((card, index) => (
//           <div key={index}>
//             <p>{card.country}</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default App;
