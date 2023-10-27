import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import VerifyOTP from './pages/VerifyOTP';
import ProductPage from './pages/ProductPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import PrivateRoute from './helper/PrivateRoute';
import AddCategory from './pages/AddCategory';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product">
            <Route path=":id" element={<PrivateRoute component={DetailPage}/>}/>
          </Route>
          <Route path="/product-page" element={<PrivateRoute component={ProductPage}/>}>
            <Route path=":id" element={<PrivateRoute component={ProductPage}/>}/>
          </Route>
          <Route path="/category" element={<PrivateRoute component={AddCategory}/>}/>
          <Route path="/" element={<PrivateRoute component={DashboardPage}/>} />
          <Route path="/verifyOTP" element={<VerifyOTP />} />
          <Route path="/cart" element={<PrivateRoute component={CartPage}/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
