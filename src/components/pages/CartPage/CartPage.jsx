import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';

import UserContext from '../../../contexts/UserContext.js';
import { $CartPage } from './style.js';

export default function CartPage() {
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (authToken.current) {
            const header = {
                headers: { Authorization: `Bearer ${authToken.current}` },
            };
            const promisse = axios.get(
                'http://localhost:5000/shopping-carts',
                header
            );
            promisse.then((response) => {
                setBooks(response.data);
                calculatePrice(response.data);
            });
        } else {
            const localStorageCartJSON =
                localStorage.getItem('local storage cart');
            let localStorageCart = localStorageCartJSON
                ? JSON.parse(localStorageCartJSON)
                : [];
            setBooks(localStorageCart);
            calculatePrice(localStorageCart);
        }
    }, []);

    function calculatePrice(books) {
        let sum = 0;
        books.forEach((book) => (sum += book.price));
        setTotalPrice(sum);
    }

    function removeBookFromCart(bookToRemove) {
        const remainingBooks = books.filter(
            (book) => book._id != bookToRemove._id
        );
        setBooks(remainingBooks);
        calculatePrice(remainingBooks);
        if (authToken.current) {
            const config = {
                headers: { Authorization: `Bearer ${authToken.current}` },
                data: { bookId: bookToRemove._id.toString() },
            };
            const promisse = axios.delete(
                'http://localhost:5000/shopping-carts',
                config
            );
        } else {
            let localStorageCartJSON =
                localStorage.getItem('local storage cart');
            let localStorageCart = localStorageCartJSON
                ? JSON.parse(localStorageCartJSON)
                : [];
            localStorageCartJSON = JSON.stringify(
                localStorageCart.filter((book) => book._id != bookToRemove._id)
            );
            localStorage.setItem('local storage cart', localStorageCartJSON);
        }
    }

    function checkout() {
        const header = {
            headers: { Authorization: `Bearer ${authToken.current}` },
        };
        const promisse = axios.post(
            'http://localhost:5000/checkout',
            { payment: 'teste' },
            header
        );
        promisse.then(() => console.log('compra efetuada'));
    }

    function signIn() {
        navigate('/login', { state: { checkout: true } });
    }

    function signUp() {
        navigate('/cadastro', { state: { checkout: true } });
    }

    return (
        <$CartPage>
            {books.length != 0 ? (
                <div>
                    <ul>
                        {books.map((book) => (
                            <div
                                className="book-container"
                                /*onClick={() => navigate(`/livro/${book._id}`)}*/
                                key={book._id}
                            >
                                <img
                                    src={book.cover}
                                    alt={`${book.name} cover`}
                                    style={{ width: '100px' }}
                                />

                                <div className="info-container">
                                    <h1>{book.name}</h1>
                                    <p>{book.author}</p>
                                    <br />
                                    <p>
                                        Preço:{' '}
                                        {book.price.toLocaleString('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </p>
                                </div>
                                <BsTrash
                                    className=" add-to-cart"
                                    onClick={() => {
                                        removeBookFromCart(book);
                                    }}
                                />
                            </div>
                        ))}
                    </ul>
                    {authToken.current ? (
                        <button onClick={checkout}>Comprar!</button>
                    ) : (
                        <>
                            <button onClick={signIn}>Faça login</button>
                            <button onClick={signUp}>Castre-se</button>
                        </>
                    )}
                </div>
            ) : (
                <>Os livros escolhidos para compra ficarão aqui!</>
            )}
        </$CartPage>
    );
}
