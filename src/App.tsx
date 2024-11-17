import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { MainComponent } from './components/main/Main';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainComponent />} />
      </Routes>
    </>
  );
};

export default App;
