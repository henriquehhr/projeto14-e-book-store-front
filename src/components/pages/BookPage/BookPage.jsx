/* eslint-disable react/jsx-pascal-case */
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { $Button } from '../../../globalStyles/globalStyles.js';
import { $BookPage } from './style.js';
import LoadingScreen from '../../LoadingScreen/LoadingScreen.jsx';

export default function BookPage() {
    const { idLivro } = useParams();
    const [book, setBook] = useState(null);

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

    function addToCart() {
        // TODO: falta implementar o carrinho
        console.log('Added to cart');
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
                            onClick={() => addToCart()}
                            className="small add-to-cart"
                        >
                            Adicionar ao Carrinho
                        </$Button>
                    </div>
                </$BookPage>
            ) : (
                <LoadingScreen />
            )}
        </>
    );
}
