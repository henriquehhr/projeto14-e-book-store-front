import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import UserContext from "../../contexts/UserContext.js";
import "../../assets/reset.css";

export default function App() {

    const authToken = useRef(JSON.parse(localStorage.getItem("secret-key"))?.token);

    const navigate = useNavigate();
    const location = useLocation();
    const contextValue = { authToken };

    useEffect(() => {
        //TODO checar se o authToken é válido
        if (authToken.current) {
            if (location.pathname == "/login" || location.pathname == "/cadastro")
                navigate("/");
            else
                navigate(location.pathname);
        } else {
            if (location.pathname == "/finalizar-compra")
                navigate("/");
        }
    }, []);

    return (
        <UserContext.Provider value={contextValue}>
            <Routes>
                <Route path="/" element={<>Página</>} />
                <Route path="/login" element={<>Página</>} />
                <Route path="/cadastro" element={<>Página</>} />
                <Route path="/livro/:nomeLivro" element={<>Página</>} />
                <Route path="/carrinho" element={<>Página</>} />
                <Route path="/finalizar-compra" element={<>Página</>} />
            </Routes>
        </UserContext.Provider>
    );
}