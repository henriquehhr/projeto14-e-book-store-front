import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import UserContext from '../../contexts/UserContext.js';
import { $Header } from './style.js';

export default function Header() {
    const { authToken } = useContext(UserContext);

    return (
        <$Header>
            {authToken?.current ? (
                <>
                    <Link className="link" to="/">
                        <h1>DrivenBooks</h1>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <span className="greeting">Olá, Fulano</span>
                            </li>
                            <li>
                                <Link className="link" to="#">
                                    Meus pedidos
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/carrinho">
                                    <AiOutlineShoppingCart />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <>
                    <Link className="link" to="/">
                        <h1>DrivenBooks</h1>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <Link className="link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/cadastro">
                                    Cadastre-se
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/carrinho">
                                    <AiOutlineShoppingCart />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
            {/* <h1>Driven-books</h1> */}
        </$Header>
    );
}
