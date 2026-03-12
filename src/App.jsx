import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Info from './pages/Info';
import Gaming from './pages/Gaming';
import Content from './pages/Content';
import Partnerships from './pages/Partnerships';
import Background from './components/Background';
import './index.css';

function App() {
  return (
    <>
      <Background />
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/content" element={<Content />} />
        <Route path="/partnerships" element={<Partnerships />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
