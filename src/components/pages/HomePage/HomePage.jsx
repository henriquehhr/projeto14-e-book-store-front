/* eslint-disable react/jsx-pascal-case */
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
=======
import { BsCartPlus } from 'react-icons/bs';
import UserContext from '../../../contexts/UserContext.js';
>>>>>>> feature/cart

import { $HomePage } from './style.js';
import Carrousel from '../../Carroussel/Carroussel.jsx';
import BookCard from '../../BookCard/BookCard.jsx';

export default function HomePage() {
    const [books, setBooks] = useState(null);
<<<<<<< HEAD
    const [kinds, setKinds] = useState(null);
    const [currentKind, setCurrentKind] = useState(null);
    const carrouselRef1 = useRef(null);
    const carrouselRef2 = useRef(null);
    const carrouselRef3 = useRef(null);
=======
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);
>>>>>>> feature/cart

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

<<<<<<< HEAD
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
=======
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
>>>>>>> feature/cart
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
                    <Carrousel carrouselRef={carrouselRef1}>
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
                    <Carrousel carrouselRef={carrouselRef2}>
                        {books
                            .filter((book) => book.kind === currentKind?._id)
                            .map((book) => (
                                <BookCard book={book} key={book._id} />
                            ))}
                    </Carrousel>

<<<<<<< HEAD
                    <h1 className="label">Todos os Livros</h1>
                    <Carrousel carrouselRef={carrouselRef3}>
                        {books.map((book) => (
                            <BookCard book={book} key={book._id} />
                        ))}
                    </Carrousel>
=======
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
>>>>>>> feature/cart
                </$HomePage>
            ) : (
                <h1>Carregando...</h1>
            )}
        </>
    );
}
