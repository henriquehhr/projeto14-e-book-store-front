/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect } from 'react';
import axios from 'axios';

import { $HomePage } from './style.js';
import Carrousel from '../../Carroussel/Carroussel.jsx';
import BookCard from '../../BookCard/BookCard.jsx';

export default function HomePage() {
    const [books, setBooks] = useState(null);
    const [kinds, setKinds] = useState(null);
    const [currentKind, setCurrentKind] = useState(null);

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

    function getKinds() {
        const url = `http://localhost:5000/kinds`;
        const promise = axios.get(url);
        promise
            .then((response) => {
                setKinds(response.data);
                setCurrentKind(response.data[0]);
            })
            .catch(() => {
                alert('Erro ao buscar os tipos');
            });
    }

    useEffect(
        () => {
            getBooks();
            getKinds();
        },
        // eslint-disable-next-line
        []
    );

    return (
        <>
            {books ? (
                <$HomePage>
                    <h1 className="label">Promoções</h1>
                    <Carrousel>
                        {books
                            .filter((book) => book.price < book.oldPrice)
                            .map((book) => (
                                <BookCard book={book} key={book._id} />
                            ))}
                    </Carrousel>

                    <div className="kinds-container">
                        {kinds?.map((kind) => (
                            <h1
                                key={kind._id}
                                className={`kind ${
                                    kind._id === currentKind._id
                                        ? 'current'
                                        : ''
                                }`}
                                onClick={() => setCurrentKind(kind)}
                            >
                                {' '}
                                {kind.name}
                            </h1>
                        ))}
                    </div>
                    <Carrousel>
                        {books
                            .filter((book) => book.kind === currentKind?._id)
                            .map((book) => (
                                <BookCard book={book} key={book._id} />
                            ))}
                    </Carrousel>

                    <h1 className="label">Todos os Livros</h1>
                    <Carrousel>
                        {books.map((book) => (
                            <BookCard book={book} key={book._id} />
                        ))}
                    </Carrousel>
                </$HomePage>
            ) : (
                <h1>Carregando...</h1>
            )}
        </>
    );
}
