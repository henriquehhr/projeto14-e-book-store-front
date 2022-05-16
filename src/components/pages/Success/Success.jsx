import { useNavigate, useLocation } from 'react-router-dom';
import { $Success } from './style.js';

export default function CartPage() {
    const navigate = useNavigate();
    const {
        state: { books, totalPrice },
    } = useLocation();

    return (
        <$Success>
            <div>
                <ul>
                    <h1 className="label">Compra finalizada com sucesso! </h1>
                    <h2>resumo da compra:</h2>
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
                </div>
                <h2>
                    Você receberá um em seu email a confirmção da compra. Caso
                    não encontre, procure na caixa de spam ;)
                </h2>
                <p className="link" onClick={() => navigate('/')}>
                    Voltar para a loja
                </p>
            </div>
        </$Success>
    );
}
