/* eslint-disable react/jsx-pascal-case */
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsCartPlus } from 'react-icons/bs';
import UserContext from '../../../contexts/UserContext.js';

import { $HomePage } from './style.js';

export default function HomePage() {
    const [books, setBooks] = useState(null);
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);

    function getBooks() {
        const url = `http://localhost:5000/books`;
        const promise = axios.get(url);
        promise
            .then((response) => {
                setBooks(response.data);
            })
            .catch(() => {
                alert('Erro ao buscar os livros');
            });
    }

    function addToCart(book) {
        console.log(authToken);
        if (authToken.current) {
            //TODO somar o carrinho do localStorage com o carrinho do BD
            const header = {
                headers: { Authorization: `Bearer ${authToken.current}` },
            };
            const booksId = [book._id];
            const promisse = axios.post(
                'http://localhost:5000/shopping-carts',
                { booksId },
                header
            );
            promisse.then((response) => console.log(response.data));
            return;
        }
        const localStorageCartJSON = localStorage.getItem('local storage cart');
        let localStorageCart = localStorageCartJSON
            ? JSON.parse(localStorageCartJSON)
            : [];
        localStorageCart.push(book);
        localStorage.setItem(
            'local storage cart',
            JSON.stringify(localStorageCart)
        );
    }

    useEffect(
        () => {
            getBooks();
        },
        // eslint-disable-next-line
        []
    );

    return (
        <>
            {books ? (
                <$HomePage>
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
                                    Preço:{' '}
                                    {book.price.toLocaleString('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </p>
                            </div>
                            <BsCartPlus
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(book);
                                }}
                                className=" add-to-cart"
                            />
                        </div>
                    ))}
                </$HomePage>
            ) : (
                <h1>Carregando...</h1>
            )}
        </>
    );
}
