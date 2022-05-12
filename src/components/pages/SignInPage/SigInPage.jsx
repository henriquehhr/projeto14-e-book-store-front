/* eslint-disable react/jsx-pascal-case */
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../../contexts/UserContext.js';
import {
    $Form,
    $Button,
    $Input,
    $Main,
} from '../../../globalStyles/globalStyles.js';

export default function LoginPage() {
    const [disabled, setDisabled] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);

    function sendLoginInfo(e) {
        e.preventDefault();
        setDisabled(true);
        const url = 'http://localhost:5000/signin';
        const promisse = axios.post(url, loginInfo);
        promisse.then((response) => {
            console.log(response.data);
            console.log(response);
            localStorage.setItem('secret-key', JSON.stringify(response.data));
            authToken.current = response.data;
            navigate('/');
        });
        promisse.catch(() => {
            setDisabled(false);
            alert('Erro no login');
        });
    }

    return (
        <$Main>
            <h1>Driven-books</h1>
            <$Form onSubmit={sendLoginInfo} action="">
                <$Input
                    placeholder="email"
                    type="email"
                    value={loginInfo.email}
                    onChange={(e) =>
                        setLoginInfo({ ...loginInfo, email: e.target.value })
                    }
                    disabled={disabled}
                />
                <$Input
                    placeholder="senha"
                    type="password"
                    value={loginInfo.password}
                    onChange={(e) =>
                        setLoginInfo({ ...loginInfo, password: e.target.value })
                    }
                    disabled={disabled}
                />
                <$Button type="submit" className="big" disabled={disabled}>
                    Entrar
                </$Button>
            </$Form>
            <Link to="/cadastro">
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </$Main>
    );
}
