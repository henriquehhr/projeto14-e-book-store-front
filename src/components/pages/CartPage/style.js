import styled from 'styled-components';

export const $CartPage = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #fafafa;
    padding: 20px;
    min-height: calc(100vh - 94px);

    .label {
        align-self: flex-start;
        font-size: 1.9rem;
        font-weight: bold;
        font-family: 'Saira Stencil One', cursive;
        color: #ff6f9c;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    ul {
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    .book-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        //max-width: 500px;
        width: 375px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        gap: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

        .info-container {
            font-family: 'Roboto', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 100%;
            margin-top: 10px;

            h1 {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 10px;
                //align-self: center;
                //text-align: center;
            }

            p {
                font-size: 1rem;
                margin-bottom: 5px;
            }

            .old-price {
                font-size: 1rem;
                text-decoration: line-through;
                color: red;
            }
        }

        .remove {
            position: absolute;
            bottom: 15px;
            right: 15px;
            font-size: 1.4rem;

            :hover {
                color: red;
            }
        }

        /*&:hover {
            -moz-transform: scale(1.05);
            -webkit-transform: scale(1.05);
            transform: scale(1.05);
        }*/
    }

    .price {
        font-size: 20px;
        font-weight: 600;
        font-family: 'Roboto', sans-serif;
    }

    button {
        padding: 15px;
        border-radius: 5px;
        border: none;
        background-color: #ffc0cb;
        font-size: 20px;
        font-weight: 600;
    }
`;
