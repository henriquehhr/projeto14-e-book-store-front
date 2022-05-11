import styled from 'styled-components';

export default function Header() {
    return (
        <$Header>
            <h1>Driven-books</h1>
        </$Header>
    );
}

const $Header = styled.header`
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

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1 {
            font-size: 1.5rem;
        }
    }
`;
