import styled, { css } from "styled-components";
import { colStyles } from "@styles";

const Col = styled.div`
  display: flex;
  ${(props) => colStyles(props, css)}
  ${(props) => props.minWid && `min-width: ${props.minWid};`}
`;

export default Col;
