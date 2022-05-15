import styled from 'styled-components';

import { $Main } from '../../../globalStyles/globalStyles.js';

export const $CartPage = styled($Main)`
    ul {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .book-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 200px;
        /* height: 300px; */
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        /* margin: 10px; */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

        .info-container {
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
                align-self: center;
                text-align: center;
            }

            p {
                font-size: 1rem;
                margin-bottom: 5px;
            }
        }

        .add-to-cart {
            position: absolute;
            bottom: 15px;
            right: 15px;
            font-size: 1.2rem;
        }

        &:hover {
            -moz-transform: scale(1.05);
            -webkit-transform: scale(1.05);
            transform: scale(1.05);
        }
    }
`;
