import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { $Button } from '../../../globalStyles/globalStyles.js';

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
                <h1>Carregando...</h1>
            )}
        </>
    );
}

const $BookPage = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
    padding: 20px;

    img {
        width: 200px;
        margin-right: 20px;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        h1 {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 20px;
        }

        p {
            font-size: 1.2rem;
            margin-bottom: 20px;
            text-align: justify;
        }

        .add-to-cart {
            align-self: flex-end;
        }
    }

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            margin-bottom: 20px;
        }

        .info-container {
            width: 100%;
        }
    }
`;
