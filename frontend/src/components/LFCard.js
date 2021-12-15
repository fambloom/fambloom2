import React from 'react';
import Styled from 'styled-components/macro';

const StyledCard = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    margin: 0.5em;
    padding: 0.5rem;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 14px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

    &:hover {
        transition: 0.2s ease-in;
        box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.4);
    }

    transition: all 0.2s ease-out;

    cursor: pointer;

    user-select: none;
`;

const StyledParagraph = Styled.p`
    text-align: center;

    margin: 0 !important;
`;


const LFCard = ({ info, onClick, ...restProps }) => {

  const renderImage = (gen) => {
    if (gen==="female") {
      return (
        <div>
        <img alt="female" width="250px" src="female.png" />
        </div>
      );
    } else {
      return (
        <div>
          <img  alt="male" width="250px" src="male.png" />
        </div>
      );
    }
  }

  return (
      <StyledCard onClick={onClick} {...restProps}>
        {renderImage(info.gender)}
          <StyledParagraph>
              {info.firstName} {info.lastName}
          </StyledParagraph>
      </StyledCard>
  );
};

export default LFCard;