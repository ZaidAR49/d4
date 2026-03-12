import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Info from './pages/Info';
import Gaming from './pages/Gaming';
import Content from './pages/Content';
import Partnerships from './pages/Partnerships';
import './index.css';

import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/content" element={<Content />} />
          <Route path="/partnerships" element={<Partnerships />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
