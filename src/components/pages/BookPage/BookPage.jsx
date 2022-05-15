/* eslint-disable react/jsx-pascal-case */
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../../contexts/UserContext.js';
import { $Button } from '../../../globalStyles/globalStyles.js';
import { $BookPage } from './style.js';

export default function BookPage() {
    const { idLivro } = useParams();
    const [book, setBook] = useState(null);
    const { authToken } = useContext(UserContext);

    function getBook() {
        const url = `http://localhost:5000/books/${idLivro}`;
        const promise = axios.get(url);
        promise
            .then((response) => {
                setBook(response.data);
            })
            .catch(() => {
                alert('Erro ao buscar o livro');
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
            getBook();
        },
        // eslint-disable-next-line
        []
    );

    return (
        <>
            {book ? (
                <$BookPage>
                    <img src={book.cover} alt={`${book.name} cover`} />
                    <div className="info-container">
                        <h1>{book.name}</h1>
                        <p>{book.author}</p>
                        <p>{book.description}</p>
                        <p>Nº Paginas: {book.pages}</p>
                        <$Button
                            onClick={() => addToCart(book)}
                            className="small add-to-cart"
                        >
                            Adicionar ao Carrinho
                        </$Button>
                    </div>
                </$BookPage>
            ) : (
                <h1>Carregando...</h1>
            )}
        </>
    );
}
