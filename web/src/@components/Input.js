import React, { useState, useReducer, useEffect } from "react";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";

import { validate } from "@helpers/validators";

const useStyles = makeStyles({
  inputTextField: {
    width: "48%",
  },
  inputTextFieldLarge: {
    width: "100%",
  },
  validatorList: {
    color: "#f44336",
    width: "100%",
    fontSize: "12px",
  },
  textField: {
    marginBottom: "0px",
  },
  focused: {},
  outlinedInput: {
    "&$focused $notchedOutline": {
      border: "1px solid #8b5cf6",
    },
  },
  notchedOutline: {},
});

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

function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });
  const { value, isValid } = inputState;
  const { id, onInput } = props;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <>
      {props.isPassword ? (
        <TextField
          type={showPassword ? "text" : "password"}
          placeholder="**************"
          variant="outlined"
          InputProps={{
            classes: {
              root: classes.outlinedInput,
              focused: classes.focused,
              notchedOutline: classes.notchedOutline,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className={
            props.width === "large"
              ? classes.inputTextFieldLarge
              : classes.inputTextField2
          }
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          error={!inputState.isValid && inputState.isTouched ? true : false}
          helperText={
            !inputState.isValid && inputState.isTouched && props.helperText
          }
        />
      ) : (
        <TextField
          id={props.type}
          placeholder={props.placeholder}
          variant="outlined"
          className={
            (props.width === "small" && classes.inputTextField) ||
            (props.width === "large" && classes.inputTextFieldLarge)
          }
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          error={!inputState.isValid && inputState.isTouched ? true : false}
          helperText={
            !inputState.isValid && inputState.isTouched && props.helperText
          }
          InputProps={{
            classes: {
              root: classes.outlinedInput,
              focused: classes.focused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      )}
      {!inputState.isValid &&
        inputState.isTouched &&
        props.inputName === "UserName" && (
          <div className={classes.validatorList}>
            <ul>
              <li>name invalid!</li>
              <li>No spaces allowed.</li>
              <li>Min length 3 characters"</li>
            </ul>
          </div>
        )}
    </>
  );
}

export default Input;
