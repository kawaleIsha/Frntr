import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Reviews from './components/Reviews'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route />
      </Routes>
      <Reviews />
    </div>
  );
}

export default App;
