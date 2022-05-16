import styled from 'styled-components';

export const $Header = styled.header`
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #ffc2da;
    box-shadow: 0px 0px 5px #000000;

    .title {
        font-size: 2.5rem;
        font-weight: bold;
        font-family: 'Saira Stencil One', cursive;
        color: #ff4791;
    }

    .link {
        color: #000;
        text-decoration: none;
    }

    .cart-icon {
        position: relative;
        .cart-quantity {
            position: absolute;
            bottom: 2px;
            right: 2px;
            font-size: 12px;
            border-radius: 50%;
            padding: 6px;
            background-color: #ff85b6;
            color: black;
        }
    }

    .item {
        position: relative;
        text-decoration: none;
        color: #000;
        cursor: pointer;
        height: 50px;
        width: 50px;
        padding: 5px;
        margin: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #ff4791;

        &:hover {
            background: #ff85b6;
        }

        .dropdown-menu {
            z-index: 2;
            position: fixed;
            top: 100px;
            right: 10px;
            width: 200px;
            background-color: #ff4791;
            border-radius: 4px;
            box-shadow: 0px 0px 5px #000000;

            ul {
                list-style: none;
                display: flex;
                flex-direction: column;

                .dropdown-item {
                    width: 100%;
                    padding: 10px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    color: #000;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;

                    &:hover {
                        background-color: #ff85b6;
                    }
                }
            }
        }
    }

    nav {
        ul {
            display: flex;
            flex-direction: row;
            align-items: center;

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
        height: auto;

        .link {
            align-self: flex-start;
        }

        nav {
            align-self: flex-end;
        }

        .item {
            .dropdown-menu {
                top: 140px;
            }
        }
    }
`;
