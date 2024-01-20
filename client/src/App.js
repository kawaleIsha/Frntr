import './App.css';
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Reviews from './components/Reviews';
import Projects from './components/categories';

const App = () => {
  const [key, setKey] = useState('hall');

  return (
    <div>
      <Navbar />
      <Routes>
        <Route />
      </Routes>
      <h2>Categories</h2>
      <Tabs
      id='controlled-tab-example'
      activeKey={key}
      onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="hall" title="Hall">
          <Projects category="hall" />
        </Tab>
        <Tab eventKey="kitchen" title="Kitchen">
          <Projects category="kitchen" />
        </Tab>
        <Tab eventKey="bed" title="Bedroom">
          <Projects category="bed" />
        </Tab>
        <Tab eventKey="flat" title="Flat">
          <Projects category="flat" />
        </Tab>
      </Tabs>
      <Reviews />
    </div>
  );
}

export default App;
