import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
