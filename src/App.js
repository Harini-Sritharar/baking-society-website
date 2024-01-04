import './App.css';

/* Components */
import NavBar from './components/NavBar';
import RecipePage from './components/RecipePage';
/* Database */
import { db } from './firebase.config';
/* Collection is to get access to a collection in the database, snapshot is for real time changes */
import { collection, onSnapshot } from 'firebase/firestore';
import { useState,useEffect } from 'react';

function App() {
  return (
    <div className='App'>
      <NavBar/>
      <RecipePage/> 
    </div>
  );
}

export default App;
