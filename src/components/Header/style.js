import styled from 'styled-components';

export const $Header = styled.header`
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 20px;

    h1 {
        font-size: 2rem;
        font-weight: bold;
    }

    .link {
        text-decoration: none;
        color: #000;
        cursor: pointer;
    }

    .greeting {
        margin-right: 20px;
    }

    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        ul {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            list-style: none;
            margin: 0;
            padding: 0;

            li {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin: 0 10px;
                color: #000;
                font-size: 1.2rem;
                font-weight: bold;
            }
        }
    }

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1 {
            font-size: 1.5rem;
        }
    }
`;
