import styled from 'styled-components';

export const $BookCard = styled.div`
    font-family: 'Roboto', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 200px;
    max-width: 200px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
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
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 10px;
            align-self: center;
            text-align: center;
            height: 2.8rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
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
`;
