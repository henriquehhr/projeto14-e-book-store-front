import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { $Form, $Button, $Input, $Main } from "../../../globalStyles/globalStyles.js";

export default function SignUpPage() {

    const [disabled, setDisabled] = useState(false);
    const [singinInfo, setSinginInfo] = useState({
        email: "",
        name: "",
        password: ""
    });
    const navigate = useNavigate();

    function sendSinginInfo(e) {
        e.preventDefault();
        setDisabled(true);
        const url = "http://localhost:5000/signup";
        const promisse = axios.post(url, singinInfo);
        promisse.then(() => navigate("/login"));
        promisse.catch(() => {
            setDisabled(false);
            alert("Erro no cadastro. Tente novamente.");
        });
    }

    return (
        <$Main>
            <h1>Driven-books</h1>
            <$Form onSubmit={sendSinginInfo} action="">
                <$Input
                    placeholder="email"
                    type="email"
                    value={singinInfo.email}
                    onChange={e => setSinginInfo({ ...singinInfo, email: e.target.value })}
                    disabled={disabled}
                />
                <$Input
                    placeholder="senha"
                    type="password"
                    value={singinInfo.password}
                    onChange={e => setSinginInfo({ ...singinInfo, password: e.target.value })}
                    disabled={disabled}
                />
                <$Input
                    placeholder="nome"
                    type="text"
                    value={singinInfo.name}
                    onChange={e => setSinginInfo({ ...singinInfo, name: e.target.value })}
                    disabled={disabled}
                />
                <$Button type="submit" className="big" disabled={disabled}>Cadastrar
                </$Button>
            </$Form>
            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </$Main>
    );
}