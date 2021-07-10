import React from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";

import { Icon } from "@components";
import loginBg from "assets/icons/login-bg.png";
import { socialLogin } from "@store/auth/AuthActions";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_NO_SPACE,
  VALIDATOR_CONFIRM_PASSWORD,
} from "@helpers/validators";
import { useForm } from "@customeHooks";
import { Input } from "@components";
import { submitRegister } from "@store/auth/AuthActions";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formState, inputHandler] = useForm(
    {
      userName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleGoogleLogin = () => {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(({ additionalUserInfo }) => {
        const data = {
          email: additionalUserInfo.profile.email,
          socialId: additionalUserInfo.profile.id,
          imageUrl: additionalUserInfo.profile.picture,
          userName: additionalUserInfo.profile.name,
        };
        console.log(data);
        if (data.email) {
          dispatch(socialLogin(data, history));
        } else {
          toast.error("Login with Google Failed!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitRegister = () => {
    dispatch(
      submitRegister(
        {
          userName: formState.inputs.userName.value,
          email: formState.inputs.email.value,
          password: formState.inputs.confirmPassword.value,
        },
        history
      )
    );
  };
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        background:
          "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)",
      }}
    >
      <div className="w-3/4 h-3/4 flex rounded-lg bg-white">
        <div className="w-2/4 h-full border-2 rounded-lg">
          <img
            src={loginBg}
            alt="loginBg"
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: "0.5rem",
              borderBottomLeftRadius: "0.5rem",
            }}
          />
        </div>
        <div className="w-2/4 h-full flex flex-col justify-center items-center">
          <p
            className="font-bold font-sans mb-4 text-center w-2/4 text-gray-700"
            style={{ fontSize: "28px", lineHeight: "40px" }}
          >
            Signup to see photos and videos from your friends.
          </p>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`bg-gradient-to-r from-white-400 to-white-500 flex shadow-2xl justify-center items-center my-4 w-1/3 rounded-full px-4 py-2  font-sans font-medium text-black border-2 border-purple-500 border-solid hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:border-0 hover:text-white `}
          >
            <Icon type="google" size="20px" marg="0 1rem 0 0" />
            Login With Google
          </button>
          <div className="w-2/4 mt-4">
            <Input
              inputName="UserName"
              id="userName"
              type="outlined-basic"
              label="User Name*"
              placeholder="MichealBrown"
              width="large"
              onInput={inputHandler}
              validators={[
                VALIDATOR_REQUIRE(),
                VALIDATOR_NO_SPACE(),
                VALIDATOR_MINLENGTH(3),
              ]}
              required={true}
            />
          </div>
          <div className="w-2/4 mt-4">
            <Input
              width="large"
              id="email"
              type="outlined-email-input"
              label="Email*"
              placeholder="user@gmail.com"
              variant="outlined"
              onInput={inputHandler}
              validators={[VALIDATOR_EMAIL()]}
              helperText={"Email is invalid!"}
            />
          </div>
          <div className="w-2/4 mt-4">
            <Input
              width="large"
              id="password"
              isPassword={true}
              label="Password*"
              onInput={inputHandler}
              validators={[VALIDATOR_MINLENGTH(6)]}
              helperText={"Minimum length 6 required!"}
            />
          </div>
          <div className="w-2/4 mt-4">
            <Input
              width="large"
              id="confirmPassword"
              isPassword={true}
              label="Confirm Password*"
              onInput={inputHandler}
              validators={[
                VALIDATOR_CONFIRM_PASSWORD(formState.inputs.password.value),
              ]}
              helperText={"Confirm password doesn't match!"}
            />
          </div>
          <button
            type="button"
            disabled={!formState.isValid}
            onClick={handleSubmitRegister}
            className={` ${formState.isValid && "bg-gradient-to-r"} ${
              !formState.isValid && "bg-gray-400"
            } flex shadow-2xl justify-center items-center my-4 w-2/4 rounded-full px-4 py-2  font-sans font-medium text-white border-solid ${
              !formState.isValid ? "from-gray-800" : "from-purple-400"
            } ${!formState.isValid ? "from-gray-800" : "via-pink-500"} ${
              !formState.isValid ? "from-gray-400" : "to-yellow-500"
            }  `}
          >
            Sign up
          </button>
          <p className="font-sans mt-2 text-center">
            By signing up, you agree to our{" "}
            <span className="font-bold ">Terms</span>,{" "}
            <span className="font-bold ">Data policy</span> and{" "}
            <span className="font-bold ">Cookies Policies</span>
          </p>
          <p className="font-sans mt-4 text-center">
            Already have an account ?{" "}
            <span
              className="font-bold text-blue-500 cursor-pointer  "
              onClick={() => history.push("/")}
            >
              Login
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
