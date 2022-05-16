import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../../contexts/UserContext.js';
import SignUpPage from '../pages/SignUpPage/SignUpPage.jsx';
import SignInPage from '../pages/SignInPage/SigInPage.jsx';
import HomePage from '../pages/HomePage/HomePage.jsx';
import BookPage from '../pages/BookPage/BookPage.jsx';
import CartPage from '../pages/CartPage/CartPage.jsx';
import Header from '../Header/Header.jsx';
import CheckOutPage from '../pages/CheckOutPage/CheckOutPage.jsx';
import '../../assets/reset.css';
import '../../assets/style.css';

export default function App() {
    const localToken = localStorage.getItem('secret-key');
    const localUserName = localStorage.getItem('username');
    const authToken = useRef(localToken ? JSON.parse(localToken) : null);
    const userName = useRef(localUserName ? JSON.parse(localUserName) : null);

    const navigate = useNavigate();
    const location = useLocation();
    const contextValue = { authToken, userName };

    useEffect(() => {
        //TODO checar se o authToken é válido
        if (authToken?.current) {
            if (
                location.pathname === '/login' ||
                location.pathname === '/cadastro'
            )
                navigate('/');
            else navigate(location.pathname);
        } else {
            if (location.pathname === '/finalizar-compra') navigate('/');
        }
    }, []);

    return (
        <UserContext.Provider value={contextValue}>
            {location.pathname === '/login' ||
            location.pathname === '/cadastro' ? (
                <></>
            ) : (
                <Header />
            )}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/cadastro" element={<SignUpPage />} />
                <Route path="/livro/:idLivro" element={<BookPage />} />
                <Route path="/carrinho" element={<CartPage />} />
                <Route path="/finalizar-compra" element={<CheckOutPage />} />
            </Routes>
        </UserContext.Provider>
    );
}
