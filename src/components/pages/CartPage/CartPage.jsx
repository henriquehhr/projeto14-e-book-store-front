import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';

import UserContext from '../../../contexts/UserContext.js';
import { $CartPage } from './style.js';

export default function CartPage() {
    const navigate = useNavigate();
    const { authToken, cart, setCart } = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (authToken.current) {
            const header = {
                headers: { Authorization: `Bearer ${authToken.current}` },
            };
            const promisse = axios.get(
                'https://driven-books.herokuapp.com/shopping-carts',
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
                'https://driven-books.herokuapp.com/shopping-carts',
                config
            );
            promisse.then(() =>
                setCart(cart.filter((book) => book._id != bookToRemove._id))
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
            setCart([...JSON.parse(localStorageCartJSON)]);
            localStorage.setItem('local storage cart', localStorageCartJSON);
        }
    }

    function confirmation() {
        navigate('/finalizar-compra', { state: { books, totalPrice } });
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
                        <h1 className="label">Carrinho de compras</h1>
                        {books.map((book) => (
                            <div
                                className="book-container"
                                onClick={() => navigate(`/livro/${book._id}`)}
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
                                        <span className="old-price">
                                            {book.oldPrice > book.price &&
                                                book.oldPrice.toLocaleString(
                                                    'pt-br',
                                                    {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    }
                                                )}
                                        </span>{' '}
                                        {book.price.toLocaleString('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </p>
                                </div>
                                <BsTrash
                                    className="remove"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeBookFromCart(book);
                                    }}
                                />
                            </div>
                        ))}
                    </ul>
                    <div className="checkout">
                        <p className="price">
                            Total: R$ {totalPrice.toFixed(2)}
                        </p>
                        {authToken.current ? (
                            <>
                                <button onClick={confirmation}>Checkout</button>
                            </>
                        ) : (
                            <div className="signInUp">
                                <button onClick={signIn}>Faça login</button>
                                <button onClick={signUp}>Cadastre-se</button>
                            </div>
                        )}
                    </div>
                    <p className="link" onClick={() => navigate('/')}>
                        Continuar comprando...
                    </p>
                </div>
            ) : (
                <>Os livros escolhidos para compra ficarão aqui!</>
            )}
        </$CartPage>
    );
}
