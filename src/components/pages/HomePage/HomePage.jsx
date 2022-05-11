import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsCartPlus } from 'react-icons/bs';

import { $HomePage } from './style.js';

export default function HomePage() {
    const [books, setBooks] = useState(null);
    const navigate = useNavigate();

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

    function addToCart() {
        // TODO: falta implementar o carrinho
        console.log('Added to cart');
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
                                    addToCart();
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
