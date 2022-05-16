import styled from 'styled-components';

export const $Button = styled.button`
    border: none;
    background: #ff4791;
    color: #ffffff;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;

    &:hover,
    &:focus {
        opacity: 0.9;
    }

    &.inverted-color {
        background: #ffffff;
        color: #ff4791;
    }

    :disabled {
        opacity: 0.7;
        display: grid;
        place-content: center;
    }

    &.big {
        height: 45px;
        font-size: 21px;
    }

    &.medium {
        height: 35px;
        width: 90.2px;
        font-size: 18px;
    }

    &.small {
        height: 35px;
        font-size: 16px;
        padding: 0 17px;
    }

    &.miniscule {
        height: 35px;
        width: 40px;
        font-size: 27px;
    }
`;

export const $Input = styled.input`
    background: #ffffff;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 20px;
    line-height: 25px;
    color: #000000;
    height: 45px;
    padding-left: 10px;
    outline: none;
    transition: all 0.3s ease-out;

    &.error {
        border: 1px solid #ff0000;
        color: #000000;
    }

    :disabled {
        background-color: #f2f2f2;
        color: #afafaf;
    }

    ::placeholder {
        color: #666666;
    }
`;

export const $Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
`;

export const $WeekButton = styled.button`
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    color: #dbdbdb;
    font-size: 20px;
    height: 30px;
    width: 30px;
    background-color: #ffffff;
    transition: all 0.3s ease-out;

    &.selected {
        border-color: #cfcfcf;
        background-color: #cfcfcf;
        color: #ffffff;
    }
`;

export const $LogoImg = styled.img`
    aspect-ratio: 332 / 196;
    height: auto;
    width: 180px;
`;

export const $H2 = styled.h2`
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
`;

export const $Main = styled.main`
    background-color: #f2f2f2;
    padding: 92px 18px 100px 18px;
    min-height: 100vh;
`;
