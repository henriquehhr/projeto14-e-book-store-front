import styled from 'styled-components';

export const $HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #fafafa;
    padding: 20px;

    .label {
        align-self: flex-start;
        font-size: 1.5rem;
        font-weight: bold;
        font-family: 'Saira Stencil One', cursive;
        color: #ff6f9c;
        margin-bottom: 20px;
    }

    .kinds-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 20px;

        .kind {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            padding: 10px;
            background-color: #ff6f9c;
            color: #fff;
            border-radius: 5px;
            font-size: 1.5rem;
            font-weight: bold;
            font-family: 'Saira Stencil One', cursive;
            cursor: pointer;

            &.current {
                background-color: #ffc0cb;
            }
        }
    }

    .container {
        position: relative;
        max-width: 90vw;
        margin-bottom: 20px;

        .left-arrow {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 1;
            /* width: 30px;
            height: 30px; */
            color: #ff6f9c;
            font-size: 30px;
            transition: all 0.3s ease-in-out;

            &:hover {
                color: #ffd0cb;
            }
        }

        .right-arrow {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 1;
            /* width: 30px;
            height: 30px; */
            color: #ff6f9c;
            font-size: 30px;
            transition: all 0.3s ease-in-out;

            &:hover {
                color: #ffd0cb;
            }
        }
    }

    .carrousel {
        position: relative;
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        padding: 10px;

        ::-webkit-scrollbar {
            display: none;
        }
    }

    .book-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 200px;
        max-width: 200px;
        margin-right: 10px;
        /* height: 300px; */
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        /* margin: 10px; */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;
        cursor: pointer;

        &:last-child {
            margin-right: 0;
        }

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

            .old-price {
                font-size: 1rem;
                text-decoration: line-through;
                color: red;
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
