import React from "react";
import styled, { css } from "styled-components";

import { buttonStyles } from "@styles";
import { Text, Icon } from "@components";

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  cursor: pointer;

  &:active {
    opacity: 0.9;
  }

  ${(props) => buttonStyles(props, css)}
`;

const MyButton = (props) => {
  return (
    <StyledButton {...props}>
      {props.icon && (
        <Icon type={props.icon} size={props.text ? "18px" : "20px"} />
      )}
      {props.text && (
        <Text
          style={{
            fontWeight: "bold",
            color: props.color
              ? props.color || "#828282"
              : (props.disabled && "#BDBDBD") ||
                (props.black ? "#1E0407" : "#ffffff"),
            marginLeft: props.icon ? 13 : 0,
            fontSize: props.fontSize ? props.fontSize : 14,
            whiteSpace: props.noWrap ? "nowrap" : "normal",
          }}
        >
          {props.text}
        </Text>
      )}
    </StyledButton>
  );
};

export default MyButton;
