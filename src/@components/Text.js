import React from "react";
import styled, { css } from "styled-components";

import { textStyles } from "@styles";

const StyledText = styled.p`
  ${(props) => textStyles(props, css)};
  ${(props) => props.weight && `font-weight: ${props.weight};`}
  ${(props) => props.cursorPointer && `cursor:pointer;`};
  ${(props) =>
    props.textDecoration && `text-decoration: ${props.textDecoration};`}
  ${(props) => (props.bold || props.inputHeader) && `font-weight: bold;`}
  ${(props) =>
    props.textOverflow &&
    `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `}
`;

const MyText = (props) => <StyledText {...props} />;

export default MyText;
