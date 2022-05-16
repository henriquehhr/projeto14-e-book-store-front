import styled from 'styled-components';

export const $SignInPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #ff4791;
    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        line-height: 50px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 24px;
    }
    form {
        max-width: 400px;
        padding: 0 24px;
        input {
            width: 100%;
            height: 58px;
            border: none;
        }
        button {
            height: 46px;
            font-weight: bold;
            margin-bottom: 36px;
        }
    }
    .link {
        font-size: 15px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .error-message {
        color: #fff;
    }
`;
