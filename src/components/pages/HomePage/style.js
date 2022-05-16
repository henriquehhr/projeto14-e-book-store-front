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
        color: #ff4791;
        margin-bottom: 20px;
    }

    .kinds-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 20px;
        padding-bottom: 5px;
        overflow-x: auto;
        scroll-behavior: smooth;
        width: 100%;

        .kind {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            padding: 10px;
            background-color: #ff4791;
            color: #fff;
            border-radius: 5px;
            font-size: 1.5rem;
            font-weight: bold;
            font-family: 'Saira Stencil One', cursive;
            cursor: pointer;

            &.current {
                background-color: #ffc2da;
            }
        }
    }
`;
