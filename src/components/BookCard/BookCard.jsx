import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsCartPlus } from 'react-icons/bs';

import UserContext from '../../contexts/UserContext.js';
import { $BookCard } from './style.js';

export default function BookCard(props) {
    const { book } = props;
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);

    function addToCart(book) {
        console.log(authToken);
        if (authToken.current) {
            const header = {
                headers: { Authorization: `Bearer ${authToken.current}` },
            };
            const booksId = [book._id];
            const promisse = axios.post(
                'https://driven-books.herokuapp.com/shopping-carts',
                { booksId },
                header
            );
            //promisse.then((response) => console.log(response.data));
            promisse.then((response) => {
                if (response.status == 204) {
                    alert('Você já comprou esse livro!');
                } else if (response.status == 206) {
                    alert('Esse livro já está no seu carrinho');
                }
            });
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
        } else {
            alert('Esse livro já está no seu carrinho!');
        }
    }

    return (
        <$BookCard onClick={() => navigate(`/livro/${book._id}`)}>
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
        </$BookCard>
    );
}
