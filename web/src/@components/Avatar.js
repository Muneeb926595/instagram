import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
    background: ${
      props.noCircle
        ? ""
        : `linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%);`
    }; 
    background-repeat: no-repeat;
    border-radius:100%;
  `}
`;

function Avatar(props) {
  const { uri, size, profile, noCircle } = props;
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
        <div
          className="bg-gray-100"
          style={{
            borderRadius: "100%",
            padding: noCircle ? "0" : "8px",
          }}
        >
          <img
            src={userPlaceholder}
            alt="avatar"
            style={{
              width: profile ? size - 20 : size - 4,
              height: profile ? size - 20 : size - 4,
              borderRadius: props.hasRadius ? props.hasRadius : "50%",
              textIndent: -9999,
              alignSelf: "center",
              objectFit: "cover",
            }}
          />
        </div>
      </Wrapper>
    );

  return (
    <Wrapper size={size} uri={uri || userPlaceholder} noCircle={noCircle}>
      <div
        className="bg-gray-100"
        style={{
          borderRadius: "100%",
          padding: noCircle ? "0" : "8px",
        }}
      >
        <img
          src={userImageHasHttp ? uri : baseUrl + uri}
          alt="avatar"
          style={{
            width: profile ? size - 20 : size - 4,
            height: profile ? size - 20 : size - 4,
            borderRadius: props.hasRadius ? props.hasRadius : "50%",
            textIndent: -9999,
            alignSelf: "center",
            objectFit: "cover",
          }}
        />
      </div>
    </Wrapper>
  );
}

export default Avatar;
