import React from 'react';
import Styled from 'styled-components/macro';

const StyledToolkit = Styled.div`
    position: absolute;

    right: 0.5em;
    bottom: 0.5em;
`;

const StyledButton = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width:  3rem;
    height: 3rem;

    padding: 0.25rem;
    margin-bottom: 0.8rem;

    border-radius: 100%;

    font-weight: 700;

    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    background-color: white;

    cursor: pointer;
    user-select: none;

    &:hover {
        color: white;
        background-color: rgba(250, 250, 250, 1);
    }

    &:active {
        background-color: rgba(250, 250, 250, 0.6);
    }

    transition: all 0.2s ease-in;
`;

const Toolkit = ({ zoomIn, zoomOut, scrollToCenter }) => {
    return (
        <StyledToolkit>
            <StyledButton onClick={scrollToCenter}>
                <img width="25px" height="20px" src="scroll-to-center.png" alt="center"></img>
            </StyledButton>
            <StyledButton onClick={zoomIn}>
              <img width="22px" height="25px" src="zoom-in.png" alt="zoom in"></img>
            </StyledButton>
            <StyledButton onClick={zoomOut}>
              <img width="25px" height="25px" src="zoom-out.png" alt="zoom out"></img>
            </StyledButton>
        </StyledToolkit>
    );
};

export default Toolkit;
