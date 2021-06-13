const buttonStyles = (props) => {
  return `
    background-color: ${
      props.bgColor ? props.bgColor : props.black ? "#1E0407" : "#ffffff"
    };
    color: ${props.color || props.black ? "#ffffff" : "#1E0407"};
    height: ${props.ht || "48px"};
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    border-radius: 30px;
    padding: ${props.pad || "0 24px"};

    ${
      props.disabled &&
      `
      background-color: #EEEEEE;`
    };

    ${
      props.icon &&
      !props.text &&
      `
      background-color: ${props.big ? "#F2F2F2" : "#ffffff"};
      width: ${props.big ? "48px" : "40px"};
      height: ${props.big ? "48px" : "40px"};
      border-radius: 50px;
      padding: 0;
      box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2);
      elevation: 8;
    `
    };

    ${
      props.shadow &&
      `
      box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2);
      elevation: 8;
    `
    };
    ${(props.icon || props.rightIcon) && props.text && `flex-direction: row;`};
    ${props.bordered && `border: 1px solid ${props.borderColor || "#e0e0e0"}`};
    ${props.marg && `margin: ${props.marg}`};
    ${props.secondary && `border-radius: 16px;`};
    ${props.textButton && `background-color: transparent;`};
    ${props.fullWid && `width: 100%;`};
    ${props.wid && `width: ${props.wid};`};
    ${props.hasRadius && `border-radius: ${props.hasRadius};`};
    ${props.bg && `background-color: ${props.bg};`};
  `;
};

export default buttonStyles;
