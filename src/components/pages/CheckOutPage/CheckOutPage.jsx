import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../../contexts/UserContext.js';
import { $CheckOutPage } from './style.js';

export default function CartPage() {
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);
    const {
        state: { books, totalPrice },
    } = useLocation();

    function checkout() {
        const header = {
            headers: { Authorization: `Bearer ${authToken.current}` },
        };
        const promisse = axios.post(
            'https://driven-books.herokuapp.com/checkout',
            { payment: 'teste' },
            header
        );
        promisse
            .then(() => navigate('/sucesso', { state: { books, totalPrice } }))
            .catch(() => console.log('erro ao efetuar compra'));
    }

    return (
        <$CheckOutPage>
            <div>
                <ul>
                    <h1 className="label">Confira os itens</h1>
                    {books.map((book) => (
                        <div className="book-container" key={book._id}>
                            <div className="info-container">
                                <h1>{book.name}</h1>
                                <p>
                                    <span className="old-price">
                                        {book.oldPrice > book.price &&
                                            book.oldPrice.toLocaleString(
                                                'pt-br',
                                                {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                }
                                            )}
                                    </span>{' '}
                                    {book.price.toLocaleString('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </p>
                            </div>
                            <img
                                src={book.cover}
                                alt={`${book.name} cover`}
                                style={{ width: '50px' }}
                            />
                        </div>
                    ))}
                </ul>
                <div className="checkout">
                    <p className="price">Total: R$ {totalPrice.toFixed(2)}</p>

                    <button onClick={checkout}>Finalizar compra</button>
                </div>
                <p className="link" onClick={() => navigate(-1)}>
                    Editar o carrinho
                </p>
            </div>
        </$CheckOutPage>
    );
}
