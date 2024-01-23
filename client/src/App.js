import './App.css';
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Reviews from './components/Reviews';
import Projects from './components/categories';
import WhatsAppIcon from './components/whatsappIcon';
import Footer from './components/footer';

const App = () => {
  const [key, setKey] = useState('hall');

  return (
    <div>
      <Navbar />
      <Routes>
        <Route />
      </Routes>
      <h2 className='m-2'>Categories</h2>
      <Tabs className='m-2'
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
      <Footer />
      <WhatsAppIcon />
    </div>
  );
}

export default App;
