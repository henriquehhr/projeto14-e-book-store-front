import styled from 'styled-components';

export const $BookPage = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
    padding: 20px;

    img {
        width: 200px;
        margin-right: 20px;
    }

    .info-container {
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
        }

        .add-to-cart {
            align-self: flex-end;
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
        }
    }
`;
