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
                    <h1>Olá</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link className="link" to="/">
                                    Todos os livros
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
                    <h1>DrivenBooks</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link className="link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link className="link" to="/cadastro">
                                    Cadastro
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
