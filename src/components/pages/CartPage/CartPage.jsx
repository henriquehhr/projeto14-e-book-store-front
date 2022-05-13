import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from "../../../contexts/UserContext.js";

export default function CartPage () {

    const navigate = useNavigate();
    const {authToken} = useContext(UserContext);
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        if(authToken) {
            const header = {
                headers: {"Authorization": `Bearer ${authToken.current}`}
            };
            const promisse = axios.get("http://localhost:5000/shopping-carts", header);
            promisse.then(response => setBooks(response.data));
        }
    }, []);

    return (
        <>página do carrinho nova</>
    );
}