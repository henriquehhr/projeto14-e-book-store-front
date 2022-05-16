/* eslint-disable react/jsx-pascal-case */
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';

import UserContext from '../../../contexts/UserContext.js';
import { $Button } from '../../../globalStyles/globalStyles.js';
import { $BookPage } from './style.js';
import LoadingScreen from '../../LoadingScreen/LoadingScreen.jsx';

export default function BookPage() {
    const { idLivro } = useParams();
    const [book, setBook] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [bookAlreadyInCart, setBookAlreadyInCart] = useState(false);
    const { authToken } = useContext(UserContext);

    const [collapsedDescription, setCollasedDescription] = useState(true);

    function getBook() {
        const url = `http://localhost:5000/books/${idLivro}`;
        let promise;
        if (authToken.current) {
            const header = {
                headers: { Authorization: `Bearer ${authToken.current}` },
            };
            promise = axios.get(url, header);
        } else {
            promise = axios.get(url);
            let localStorageCartJSON =
                localStorage.getItem('local storage cart');
            let localStorageCart = localStorageCartJSON
                ? JSON.parse(localStorageCartJSON)
                : [];
            if (localStorageCart.find((book) => book._id == idLivro))
                setBookAlreadyInCart(true);
        }
        promise
            .then((response) => {
                setBook(response.data);
                console.log(response.status);
                if (response.status == 207) setDisabled(true);
                else if (response.status == 202) setBookAlreadyInCart(true);
            })
            .catch(() => {
                alert('Erro ao buscar o livro');
            });
    }

    function addToCart(book) {
        if (bookAlreadyInCart) return removeBookFromCart(book);
        setBookAlreadyInCart(true);
        if (authToken.current) {
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
        if (
            !localStorageCart.find(
                (localStorageBook) => localStorageBook._id == book._id
            )
        ) {
            localStorageCart.push(book);
            localStorage.setItem(
                'local storage cart',
                JSON.stringify(localStorageCart)
            );
        }
    }

    function removeBookFromCart(bookToRemove) {
        setBookAlreadyInCart(false);
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
                        <p
                            className={
                                collapsedDescription
                                    ? 'description collapsed-description'
                                    : 'description '
                            }
                        >
                            {book.description}
                        </p>
                        <p
                            className="reed-more"
                            onClick={() =>
                                setCollasedDescription(!collapsedDescription)
                            }
                        >
                            {collapsedDescription ? 'Ler mais' : 'Ler menos'}
                        </p>

                        <p>Nº Paginas: {book.pages}</p>
                        <p>
                            <span className="old-price">
                                {book.oldPrice > book.price &&
                                    book.oldPrice.toLocaleString('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                            </span>{' '}
                            {book.price.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </p>
                        <$Button
                            disabled={disabled}
                            onClick={() => addToCart(book)}
                            className={
                                bookAlreadyInCart
                                    ? 'already-in-cart small add-to-cart'
                                    : 'small add-to-cart'
                            }
                        >
                            {disabled ? 'Você já tem esse livro' : ''}
                            {bookAlreadyInCart
                                ? 'Remover do carrinho'
                                : 'Adicionar ao Carrinho'}
                        </$Button>
                    </div>
                </$BookPage>
            ) : (
                <LoadingScreen />
            )}
        </>
    );
}
