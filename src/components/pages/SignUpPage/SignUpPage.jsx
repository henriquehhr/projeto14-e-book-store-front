/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
    $Form,
    $Button,
    $Input,
    $Main,
} from '../../../globalStyles/globalStyles.js';

export default function SignUpPage() {
    const [disabled, setDisabled] = useState(false);
    const [validateForm, setValidateForm] = useState(false);
    const [singupInfo, setSingupInfo] = useState({
        email: '',
        name: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    function sendSingupInfo(e) {
        e.preventDefault();
        if (confirmPassword !== singupInfo.password) {
            alert('As senhas não conferem');
            return;
        }
        setDisabled(true);
        const url = 'http://localhost:5000/signup';
        const promisse = axios.post(url, singupInfo);
        promisse.then(() => navigate('/'));
        promisse.catch((error) => {
            setDisabled(false);
            alert(error.response.data);
        });
    }

    useEffect(() => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
        if (
            singupInfo.name &&
            emailRegex.test(singupInfo.email) &&
            singupInfo.password &&
            confirmPassword
        ) {
            setValidateForm(true);
        } else {
            setValidateForm(false);
        }
    }, [singupInfo, confirmPassword]);

    return (
        <$Main>
            <h1>Driven-books</h1>
            <$Form onSubmit={sendSingupInfo} action="">
                <$Input
                    placeholder="nome"
                    type="text"
                    value={singupInfo.name}
                    onChange={(e) =>
                        setSingupInfo({ ...singupInfo, name: e.target.value })
                    }
                    disabled={disabled}
                />
                <$Input
                    placeholder="email"
                    type="email"
                    value={singupInfo.email}
                    onChange={(e) =>
                        setSingupInfo({ ...singupInfo, email: e.target.value })
                    }
                    disabled={disabled}
                />
                <$Input
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
                />
                <$Input
                    placeholder="confirmar senha"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={disabled}
                />
                <$Button
                    type="submit"
                    className="big"
                    disabled={disabled || !validateForm}
                >
                    Cadastrar
                </$Button>
            </$Form>
            <Link to="/login">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </$Main>
    );
}
