import styled from "styled-components";

export const $Button = styled.button`
    border: none;
    background: #52B6FF;
    color: #FFFFFF;
    border-radius: 5px;
    text-align: center;

    &.inverted-color {
        background: #FFFFFF;
        color: #52B6FF;
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
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 20px;
    line-height: 25px;
    color: #666666;
    height: 45px;
    padding-left: 10px;
    transition: all .3s ease-out;


    :disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
    }

    ::placeholder {
        color: #DBDBDB;
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
    background-color: #FFFFFF;
    transition: all 0.3s ease-out;

    &.selected {
        border-color: #CFCFCF;
        background-color: #CFCFCF;
        color: #FFFFFF;
    }
`;

export const $LogoImg = styled.img`
    aspect-ratio: 332 / 196;
    height: auto;
    Width : 180px;
`;

export const $H2 = styled.h2`
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
`;

export const $Main = styled.main`
    background-color: #F2F2F2;
    padding: 92px 18px 100px 18px;
    min-height: 100vh;
`;