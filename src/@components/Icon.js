import React from "react";
import styled from "styled-components";

import { icons } from "assets";

const MyIcon = styled.img`
  width: ${(props) => (props.width ? props.width : props.size || "25px")};
  height: ${(props) => (props.height ? props.height : props.size || "25px")};
  margin: ${(props) => props.marg || "0"};
  position: ${(props) => props.pos || ""};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
`;

const Icon = (props) => {
  return <MyIcon {...props} src={icons[props.type]} />;
};

export default Icon;
