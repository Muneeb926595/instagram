import React, { useState, useEffect } from "react";
import styled from "styled-components";

import circle from "assets/icons/avatar-circle.png";
import userPlaceholder from "assets/icons/user-placeholder.png";

const baseUrl = "";

const Wrapper = styled.div`
  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
  background-size: ${(props) => props.size + "px " + props.size + "px"};
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.uri &&
    `
    background-image: ${props.noCircle ? "" : `url(${circle})`}; 
    background-repeat: no-repeat;
  `}
`;

function Avatar(props) {
  const { uri, size, noCircle, small } = props;
  const [userImageHasHttp, setUserImageHasHttp] = useState(false);

  useEffect(() => {
    if (uri && uri !== "undefined") {
      const prefix = uri.toString().split("/")[0];
      if (prefix === "images") {
        setUserImageHasHttp(false);
      } else {
        setUserImageHasHttp(true);
      }
    }
  }, [uri]);

  if (!uri)
    return (
      <Wrapper size={size} uri={userPlaceholder} noCircle={noCircle}>
        <img
          src={userPlaceholder}
          alt="avatar"
          style={{
            width: size - 4,
            height: size - 4,
            borderRadius: props.hasRadius ? props.hasRadius : "50%",
            textIndent: -9999,
            alignSelf: "center",
            border: `${
              props.noBorder
                ? "none"
                : small
                ? `1px solid #ffffff`
                : `3px solid #ffffff`
            }`,
          }}
        />
      </Wrapper>
    );

  return (
    <Wrapper size={size} uri={uri || userPlaceholder} noCircle={noCircle}>
      <img
        src={userImageHasHttp ? uri : baseUrl + uri}
        alt="avatar"
        style={{
          width: size - 4,
          height: size - 4,
          borderRadius: props.hasRadius ? props.hasRadius : "50%",
          textIndent: -9999,
          alignSelf: "center",
          border: `${
            props.noBorder
              ? "none"
              : small
              ? `1px solid #ffffff`
              : `3px solid #ffffff`
          }`,
        }}
      />
    </Wrapper>
  );
}

export default Avatar;
