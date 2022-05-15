import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsCartPlus } from 'react-icons/bs';

import UserContext from '../../contexts/UserContext.js';

export default function BookCard(props) {
    const { book } = props;
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);

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

    return (
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
            </div>
            <BsCartPlus
                onClick={(e) => {
                    e.stopPropagation();
                    addToCart(book);
                }}
                className=" add-to-cart"
            />
        </div>
    );
}
