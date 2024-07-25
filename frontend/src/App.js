import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Pregunta from './components/Pregunta';
import HomePage from './components/HomePage';
import Login from "./components/Login";
import {Register} from "./components/Register";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/pregunta" element={<Pregunta/>}/>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
