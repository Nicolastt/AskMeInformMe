import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Pregunta from './components/Pregunta';
import HomePage from './components/HomePage';
import Login from "./components/Login";
import { Register } from "./components/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [userImage, setUserImage] = useState(''); // Estado para la imagen del usuario

  const handleLogin = (imagePath) => {
    setIsAuthenticated(true);
    setUserImage(imagePath); // Guarda la imagen del usuario
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/pregunta" element={isAuthenticated ? <Pregunta userImage={userImage} /> : <HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
