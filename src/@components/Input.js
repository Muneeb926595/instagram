import React, { useState, useReducer, useEffect } from "react";
import styled, { css } from "styled-components";

import { inputStyles } from "@styles";
import { Text, Icon, Row } from "@components";
import { validate } from "@helpers/validators";

const MainContainer = styled.div`
  display: flex;
  ${(props) => inputStyles(props, css).container}
`;

const IconContainer = styled.div`
  display: flex;
  width: 45px;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  ${(props) => props.wid && `width: ${props.wid}`};
  ${(props) => props.hasBorder && `border: ${props.hasBorder}`};
  ${(props) => inputStyles(props, css).input};
`;

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    }
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const MyInput = (props) => {
  const {
    limit,
    icon,
    title,
    length,
    titleTextSize,
    titleFontFamily,
    iconSize,
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });
  //   const { value, isValid } = inputState;
  //   const { id, onInput } = props;

  //   useEffect(() => {
  //     onInput(id, value, isValid);
  //   }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.nativeEvent.text,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return (
    <div style={{ width: "100%" }}>
      {title && (
        <Text
          style={{
            fontWeight: "bold",
            color: "#ABABAB",
            fontSize: titleTextSize ? titleTextSize : 12,
            letterSpacing: 1,
            marginBottom: 8,
            fontFamily: titleFontFamily ? titleFontFamily : "SFProDisplay",
          }}
        >
          {title.toUpperCase()}
        </Text>
      )}

      <MainContainer {...props}>
        {icon && (
          <IconContainer>
            <Icon type={props.icon} size={iconSize ? iconSize : 16} />
          </IconContainer>
        )}

        <StyledInput
          placeholderTextColor={
            props.rounded ? "rgba(30, 4, 7, 0.5)" : "#707070"
          }
          {...props}
          onChange={changeHandler}
          onblur={touchHandler}
          value={inputState.value}
        />

        {props.limit && (
          <Text style={{ fontSize: 16, letterSpacing: 0.2 }}>
            {length}/{limit}
          </Text>
        )}
      </MainContainer>
      {!inputState.isValid && inputState.isTouched && (
        <Row noFlex center marg="6px 0">
          <Icon type="close-red" size="9px" />
          <Text
            marg="0 0 0 10px"
            color="#EB5757"
            weight="400"
            size="14px"
            spacing="0.5px"
          >
            {!inputState.isValid && inputState.isTouched && props.errMessage}
          </Text>
        </Row>
      )}
    </div>
  );
};
export default MyInput;
