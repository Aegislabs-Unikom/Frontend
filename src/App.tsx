import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import VerifyOTP from './pages/VerifyOTP';
import ProductPage from './pages/ProductPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import AddressPage from './pages/AddressPage';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product">
            <Route path=":id" element={<DetailPage />} />
          </Route>
          <Route path="/product-page" element={<ProductPage />} >
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/verifyOTP" element={<VerifyOTP />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/addAdress" element={<AddressPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
