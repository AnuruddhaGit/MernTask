import React from "react";
import Logo from "../Images/logo.jpg";

function header() {
  return (
    <div>
      <div className="header">
        <a href="/" className="logo">
          <img className="logo1" src={Logo} alt="BigCo Inc. logo" />
        </a>
        <div className="header-right">
          <a href="/">Home</a>
          <a href="/">Contact</a>
          <a href="/">About</a>
        </div>
      </div>
    </div>
  );
}

export default header;
