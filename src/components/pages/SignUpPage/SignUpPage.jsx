/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import {
    $Form,
    $Button,
    $Input,
    $Main,
} from '../../../globalStyles/globalStyles.js';

import { $SignUpPage } from './style.js';

export default function SignUpPage() {
    const [disabled, setDisabled] = useState(false);
    const [singupInfo, setSingupInfo] = useState({
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    function sendSingupInfo(e) {
        e.preventDefault();
        setIsSubmitted(true);

        if (Object.keys(formErrors).length !== 0) {
            if (formErrors.name) {
                nameRef.current.focus();
                return;
            }
            if (formErrors.email) {
                emailRef.current.focus();
                return;
            }
            if (formErrors.password) {
                passwordRef.current.focus();
                return;
            }
            if (formErrors.passwordConfirm) {
                passwordConfirmRef.current.focus();
                return;
            }
        } else {
            setDisabled(true);
            const url = 'https://driven-books.herokuapp.com/signup';
            const body = {
                email: singupInfo.email,
                name: singupInfo.name,
                password: singupInfo.password,
            };
            const promisse = axios.post(url, body);
            promisse.then(() => {
                if (location.state)
                    navigate('/login', { state: { checkout: true } });
                else navigate('/login');
            });
            promisse.catch((error) => {
                setDisabled(false);
                alert(error.response.data);
            });
        }
    }

    function validate(values) {
        const errors = {};
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

        if (!values.name) {
            errors.name = 'Nome é obrigatório';
        }

        if (!values.email) {
            errors.email = 'Email é obrigatório';
        } else if (!emailRegex.test(values.email)) {
            errors.email = 'Email inválido';
        }

        if (!values.password) {
            errors.password = 'Senha é obrigatória';
        } else if (values.password.length < 6) {
            errors.password = 'Senha deve ter no mínimo 6 caracteres';
        } else if (values.password.length > 20) {
            errors.password = 'Senha deve ter no máximo 20 caracteres';
        }

        if (!values.passwordConfirm) {
            errors.passwordConfirm = 'Confirmação de senha é obrigatória';
        } else if (values.password !== values.passwordConfirm) {
            errors.passwordConfirm = 'As senhas não conferem';
        }

        return errors;
    }

    function navigateToSignIn() {
        if (location.state) navigate('/login', { state: { checkout: true } });
        else navigate('/login');
    }

    useEffect(() => {
        setFormErrors(validate(singupInfo));
    }, [singupInfo]);

    return (
        <$SignUpPage>
            <h1>Driven-books</h1>
            <$Form onSubmit={sendSingupInfo} action="">
                <$Input
                    className={formErrors.name && isSubmitted ? 'error' : ''}
                    placeholder="Nome"
                    type="text"
                    value={singupInfo.name}
                    onChange={(e) =>
                        setSingupInfo({ ...singupInfo, name: e.target.value })
                    }
                    disabled={disabled}
                    ref={nameRef}
                />
                {isSubmitted && formErrors.name && (
                    <span className="error-message">{formErrors.name}</span>
                )}
                <$Input
                    className={formErrors.email && isSubmitted ? 'error' : ''}
                    placeholder="Email"
                    type="text"
                    value={singupInfo.email}
                    onChange={(e) =>
                        setSingupInfo({ ...singupInfo, email: e.target.value })
                    }
                    disabled={disabled}
                    ref={emailRef}
                />
                {isSubmitted && formErrors.email && (
                    <span className="error-message">{formErrors.email}</span>
                )}
                <$Input
                    className={
                        formErrors.password && isSubmitted ? 'error' : ''
                    }
                    placeholder="Senha"
                    type="password"
                    value={singupInfo.password}
                    onChange={(e) =>
                        setSingupInfo({
                            ...singupInfo,
                            password: e.target.value,
                        })
                    }
                    disabled={disabled}
                    ref={passwordRef}
                />
                {isSubmitted && formErrors.password && (
                    <span className="error-message">{formErrors.password}</span>
                )}
                <$Input
                    className={
                        formErrors.passwordConfirm && isSubmitted ? 'error' : ''
                    }
                    placeholder="Confirmar senha"
                    type="password"
                    value={singupInfo.passwordConfirm}
                    onChange={(e) =>
                        setSingupInfo({
                            ...singupInfo,
                            passwordConfirm: e.target.value,
                        })
                    }
                    disabled={disabled}
                    ref={passwordConfirmRef}
                />
                {isSubmitted && formErrors.passwordConfirm && (
                    <span className="error-message">
                        {formErrors.passwordConfirm}
                    </span>
                )}
                <$Button
                    type="submit "
                    className="big inverted-color"
                    disabled={disabled}
                >
                    Cadastrar
                </$Button>
            </$Form>
            <h2 className="link" onClick={navigateToSignIn}>
                <p>Já tem uma conta? Faça login!</p>
            </h2>
            <h2 className="link" onClick={() => navigate('/')}>
                Continuar sem cadastro
            </h2>
        </$SignUpPage>
    );
}
