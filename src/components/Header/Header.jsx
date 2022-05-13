import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AiOutlineShopping,
    AiOutlineUser,
    AiOutlineLogin,
} from 'react-icons/ai';

import UserContext from '../../contexts/UserContext.js';
import { $Header } from './style.js';

export default function Header() {
    const { authToken } = useContext(UserContext);
    const [currentDropdown, setCurrentDropdown] = useState(null);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('secret-key');
        navigate('/');
        window.location.reload();
    }

    return (
        <$Header>
            <Link className="link " to="/">
                <h1 className="title">DrivenBooks</h1>
            </Link>
            {authToken?.current ? (
                <nav>
                    <ul>
                        <li>
                            <span className="greeting">Olá, Fulano</span>
                        </li>
                        <li>
                            <DropdownMenu
                                currentDropdown={currentDropdown}
                                setCurrentDropdown={setCurrentDropdown}
                                name={'user'}
                                icon={<AiOutlineUser />}
                            >
                                <li className="dropdown-item">
                                    <span onClick={() => logout()}>Sair</span>
                                </li>
                                <li className="dropdown-item">
                                    <Link className="link" to="#">
                                        Meus Pedidos
                                    </Link>
                                </li>
                            </DropdownMenu>
                        </li>
                        <li>
                            <DropdownMenu
                                currentDropdown={currentDropdown}
                                setCurrentDropdown={setCurrentDropdown}
                                name={'cart'}
                                icon={<AiOutlineShopping />}
                            >
                                <li className="dropdown-item">
                                    <Link className="link" to="/cart">
                                        Meu Carrinho
                                    </Link>
                                </li>
                            </DropdownMenu>
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
                                <li className="dropdown-item">
                                    <Link className="link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link className="link" to="/cadastro">
                                        Cadastre-se
                                    </Link>
                                </li>
                            </DropdownMenu>
                        </li>
                        <li>
                            <DropdownMenu
                                currentDropdown={currentDropdown}
                                setCurrentDropdown={setCurrentDropdown}
                                name={'cart'}
                                icon={<AiOutlineShopping />}
                            >
                                <li className="dropdown-item">
                                    <Link className="link" to="/cart">
                                        Carrinho
                                    </Link>
                                </li>
                            </DropdownMenu>
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
