import React from "react";

import "./Button.css";

const Button = (props) => {
  const { label, icon, backgroundStyle, action } = props;

  return (
    <button className={`app-button ${backgroundStyle}`} onClick={action}>
      {icon}
      {label}
    </button>
  );
};

export default Button;
