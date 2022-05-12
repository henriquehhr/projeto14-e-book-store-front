import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import UserContext from '../../contexts/UserContext.js';
import { $Header } from './style.js';

export default function Header() {
    const { authToken } = useContext(UserContext);
    const [open, setOpen] = useState(false);

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
                                <span
                                    className="greeting"
                                    onClick={() => setOpen(!open)}
                                >
                                    Olá, Fulano{' '}
                                    {open ? <FaAngleUp /> : <FaAngleDown />}
                                    {open && <DropdownMenu />}
                                </span>
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

function DropdownMenu() {
    const navigate = useNavigate();

    function logout() {
        // TODO: logout endpoint
        localStorage.removeItem('secret-key');
        navigate('/');
        window.location.reload(false);
    }
    return (
        <ul className="dropdown-menu">
            <li onClick={() => logout()}>Sair</li>
        </ul>
    );
}
