import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import VerifyOTP from './pages/VerifyOTP';
import ProductPage from './pages/ProductPage';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product">
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/verifyOTP" element={<VerifyOTP />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
