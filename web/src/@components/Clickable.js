import styled from "styled-components";

const CustomClickable = styled.div`
  cursor: pointer;
  ${(props) => props.marg && `margin: ${props.marg};`}

  &:active {
    opacity: 0.6;
  }
`;

export default CustomClickable;
