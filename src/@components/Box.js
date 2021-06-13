import styled, { css } from "styled-components";
import { boxStyles } from "@styles";

const Box = styled.div`
  ${(props) =>
    props.overflow &&
    `::-webkit-scrollbar {
     width:0px;
}`};
  ${(props) => props.cursorPointer && `cursor:pointer;`};
  ${(props) => boxStyles(props, css)}
`;

export default Box;
