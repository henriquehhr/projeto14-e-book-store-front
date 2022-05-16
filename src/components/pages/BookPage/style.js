import styled from 'styled-components';

export const $BookPage = styled.div`
    .back {
        margin: 20px;
    }

    .book {
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin: 0 auto;
        padding: 20px;
    }

    img {
        width: 200px;
        margin-right: 20px;
    }

    .info-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        h1 {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 20px;
        }

        p {
            font-size: 1.2rem;
            margin-bottom: 20px;
            text-align: justify;

            &.description {
                margin-bottom: 5px;

                &.collapsed-description {
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            &.reed-more {
                color: #00bcd4;
                align-self: flex-end;
                cursor: pointer;
            }
        }

        .add-to-cart {
            position: absolute;
            bottom: 20px;
            right: 0px;
        }

        .old-price {
            font-size: 1rem;
            text-decoration: line-through;
            color: red;
        }
    }

    button {
        :disabled {
            background-color: gray;
        }

        &.already-in-cart {
            background-color: #ffc2da;
        }
    }

    @media (max-width: 600px) {
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            margin-bottom: 20px;
        }

        .info-container {
            width: 100%;

            .old-price {
                display: block;
            }
        }
    }
`;
