import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Admin from './pages/Admin';

function App() {
  return (
    <EventProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </EventProvider>
  );
}

export default App;
