import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeContextProvider from './Context/ThemeContextProvider';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import NavBar from './components/NavBar/NavBar';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },[]);

  return (
    <ThemeContextProvider>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/item/details/:id" element={<ItemPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
    
  );
}

export default App;
