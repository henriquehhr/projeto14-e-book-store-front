/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../../contexts/UserContext.js';
import { $Form, $Button, $Input } from '../../../globalStyles/globalStyles.js';

import { $SignInPage } from './style.js';

export default function LoginPage() {
    const [disabled, setDisabled] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function sendLoginInfo(e) {
        e.preventDefault();
        setIsSubmitted(true);

        if (Object.keys(formErrors).length !== 0) {
            if (formErrors.email) {
                emailRef.current.focus();
                return;
            }
            if (formErrors.password) {
                passwordRef.current.focus();
                return;
            }
        } else {
            setDisabled(true);
            const url = 'http://localhost:5000/signin';
            const promisse = axios.post(url, loginInfo);
            promisse.then((response) => {
                console.log(response.data);
                localStorage.setItem(
                    'secret-key',
                    JSON.stringify(response.data)
                );
                authToken.current = response.data;
                const localStorageCartJSON =
                    localStorage.getItem('local storage cart');
                let localStorageCart = localStorageCartJSON
                    ? JSON.parse(localStorageCartJSON)
                    : null;
                if (localStorageCart) {
                    const header = {
                        headers: {
                            Authorization: `Bearer ${authToken.current}`,
                        },
                    };
                    const promisse = axios.post(
                        'http://localhost:5000/shopping-carts',
                        { booksId: localStorageCart },
                        header
                    );
                    promisse.then(() =>
                        localStorage.removeItem('local storage cart')
                    );
                }
                navigate('/');
            });
            promisse.catch(() => {
                setDisabled(false);
                alert('Erro no login');
            });
        }
    }

    function validate(values) {
        const errors = {};
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

        if (!values.email) {
            errors.email = 'Email é obrigatório';
        } else if (!emailRegex.test(values.email)) {
            errors.email = 'Email inválido';
        }

        if (!values.password) {
            errors.password = 'Senha é obrigatória';
        }

        return errors;
    }

    useEffect(() => {
        setFormErrors(validate(loginInfo));
    }, [loginInfo]);

    return (
        <$SignInPage>
            <h1>DrivenBooks</h1>
            <$Form onSubmit={sendLoginInfo} action="">
                <$Input
                    className={formErrors.email && isSubmitted ? 'error' : ''}
                    placeholder="Email"
                    type="text"
                    value={loginInfo.email}
                    onChange={(e) =>
                        setLoginInfo({ ...loginInfo, email: e.target.value })
                    }
                    disabled={disabled}
                    ref={emailRef}
                />
                {formErrors.email && isSubmitted && (
                    <span className="error-message">{formErrors.email}</span>
                )}
                <$Input
                    className={
                        formErrors.password && isSubmitted ? 'error' : ''
                    }
                    placeholder="Senha"
                    type="password"
                    value={loginInfo.password}
                    onChange={(e) =>
                        setLoginInfo({ ...loginInfo, password: e.target.value })
                    }
                    disabled={disabled}
                    ref={passwordRef}
                />
                {formErrors.password && isSubmitted && (
                    <span className="error-message">{formErrors.password}</span>
                )}
                <$Button
                    type="submit"
                    className="big inverted-color"
                    disabled={disabled}
                >
                    Entrar
                </$Button>
            </$Form>
            <h2 className="link" onClick={() => navigate('/cadastro')}>
                Não tem uma conta? Cadastre-se!
            </h2>
            <h2 className="link" onClick={() => navigate('/')}>
                Continuar sem Login
            </h2>
        </$SignInPage>
    );
}
