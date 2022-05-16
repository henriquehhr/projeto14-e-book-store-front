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
            const url = 'http://localhost:5000/signup';
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

    useEffect(() => {
        setFormErrors(validate(singupInfo));
    }, [singupInfo]);

    return (
        <$Main>
            <h1>Driven-books</h1>
            <$Form onSubmit={sendSingupInfo} action="">
                <$Input
                    className={formErrors.name && isSubmitted ? 'error' : ''}
                    placeholder="nome"
                    type="text"
                    value={singupInfo.name}
                    onChange={(e) =>
                        setSingupInfo({ ...singupInfo, name: e.target.value })
                    }
                    disabled={disabled}
                    ref={nameRef}
                />
                {isSubmitted && formErrors.name && (
                    <span style={{ color: 'red' }}>{formErrors.name}</span>
                )}
                <$Input
                    className={formErrors.email && isSubmitted ? 'error' : ''}
                    placeholder="email"
                    type="text"
                    value={singupInfo.email}
                    onChange={(e) =>
                        setSingupInfo({ ...singupInfo, email: e.target.value })
                    }
                    disabled={disabled}
                    ref={emailRef}
                />
                {isSubmitted && formErrors.email && (
                    <span style={{ color: 'red' }}>{formErrors.email}</span>
                )}
                <$Input
                    className={
                        formErrors.password && isSubmitted ? 'error' : ''
                    }
                    placeholder="senha"
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
                    <span style={{ color: 'red' }}>{formErrors.password}</span>
                )}
                <$Input
                    className={
                        formErrors.passwordConfirm && isSubmitted ? 'error' : ''
                    }
                    placeholder="confirmar senha"
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
                    <span style={{ color: 'red' }}>
                        {formErrors.passwordConfirm}
                    </span>
                )}
                <$Button type="submit" className="big" disabled={disabled}>
                    Cadastrar
                </$Button>
            </$Form>
            <Link to="/login">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </$Main>
    );
}
