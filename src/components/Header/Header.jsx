import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AiOutlineShopping,
    AiOutlineUser,
    AiOutlineLogin,
} from 'react-icons/ai';
import axios from 'axios';

import UserContext from '../../contexts/UserContext.js';
import { $Header } from './style.js';

export default function Header() {
    const { authToken, userName, cart, setCart } = useContext(UserContext);
    const [currentDropdown, setCurrentDropdown] = useState(null);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('secret-key');
        navigate('/');
        window.location.reload();
    }

    useEffect(() => {
        if (authToken.current) {
            const header = {
                headers: { Authorization: `Bearer ${authToken.current}` },
            };
            const promisse = axios.get(
                'http://localhost:5000/shopping-carts',
                header
            );
            promisse.then((response) => {
                setCart(response.data);
            });
        } else {
            const localStorageCartJSON =
                localStorage.getItem('local storage cart');
            let localStorageCart = localStorageCartJSON
                ? JSON.parse(localStorageCartJSON)
                : [];
            setCart(localStorageCart);
        }
    }, []);

    return (
        <$Header>
            <Link className="link " to="/">
                <h1 className="title">DrivenBooks</h1>
            </Link>
            {authToken?.current ? (
                <nav>
                    <ul>
                        <li>
                            <span className="greeting">
                                Olá,{' '}
                                {
                                    userName.current
                                        .split(' ')
                                        .map(
                                            (elem) =>
                                                elem[0].toUpperCase() +
                                                elem.slice(1)
                                        )[0]
                                }
                            </span>
                        </li>
                        <li>
                            <DropdownMenu
                                currentDropdown={currentDropdown}
                                setCurrentDropdown={setCurrentDropdown}
                                name={'user'}
                                icon={<AiOutlineUser />}
                            >
                                <li
                                    className="dropdown-item"
                                    onClick={() => logout()}
                                >
                                    <span>Sair</span>
                                </li>
                                <li
                                    className="dropdown-item"
                                    onClick={() => navigate('/meus-pedidos')}
                                >
                                    Meus Pedidos
                                </li>
                            </DropdownMenu>
                        </li>
                        <li className="cart-icon">
                            <DropdownMenu
                                currentDropdown={currentDropdown}
                                setCurrentDropdown={setCurrentDropdown}
                                name={'cart'}
                                icon={<AiOutlineShopping />}
                            >
                                <li
                                    className="dropdown-item"
                                    onClick={() => navigate('/carrinho')}
                                >
                                    Meu Carrinho
                                </li>
                            </DropdownMenu>
                            {cart.length > 0 && (
                                <p className="cart-quantity">{cart.length}</p>
                            )}
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav>
                    <ul>
                        <li>
                            <DropdownMenu
                                currentDropdown={currentDropdown}
                                setCurrentDropdown={setCurrentDropdown}
                                name={'user'}
                                icon={<AiOutlineLogin />}
                            >
                                <li
                                    className="dropdown-item"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </li>
                                <li
                                    className="dropdown-item"
                                    onClick={() => navigate('/cadastro')}
                                >
                                    Cadastre-se
                                </li>
                            </DropdownMenu>
                        </li>
                        <li className="cart-icon">
                            <DropdownMenu
                                currentDropdown={currentDropdown}
                                setCurrentDropdown={setCurrentDropdown}
                                name={'cart'}
                                icon={<AiOutlineShopping />}
                            >
                                <li
                                    className="dropdown-item"
                                    onClick={() => navigate('/carrinho')}
                                >
                                    Carrinho
                                </li>
                            </DropdownMenu>
                            {cart.length > 0 && (
                                <div className="cart-quantity">
                                    <p>{cart.length}</p>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            )}
        </$Header>
    );
}

function DropdownMenu(props) {
    const { currentDropdown, setCurrentDropdown, name, icon } = props;

    return (
        <div
            className="item"
            onClick={() =>
                setCurrentDropdown(currentDropdown === name ? null : name)
            }
        >
            {icon}
            {currentDropdown === name && (
                <div
                    className="dropdown-menu"
                    onMouseLeave={() => setCurrentDropdown(null)}
                >
                    <ul>{props.children}</ul>
                </div>
            )}
        </div>
    );
}
