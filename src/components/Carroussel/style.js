import styled from 'styled-components';

export const $Carroussel = styled.div`
    position: relative;
    max-width: calc(100vw - 40px);
    margin-bottom: 20px;

    .arrows {
        .arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 1;
            color: #ff6f9c;
            font-size: 30px;
            transition: all 0.3s ease-in-out;

            &:hover {
                color: #ffd0cb;
            }

            &.left {
                left: 0;
            }

            &.right {
                right: 0;
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
`;
