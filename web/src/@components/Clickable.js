import styled from "styled-components";

const CustomClickable = styled.div`
  cursor: pointer;
  ${(props) => props.marg && `margin: ${props.marg};`}
  ${(props) => props.pad && `padding: ${props.pad};`}

  &:active {
    opacity: 0.6;
  }
`;

export default CustomClickable;
