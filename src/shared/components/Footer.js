import React from "react";
import { Row, Col } from "antd";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <NavLink
        style={{ color: "white", top: "20%", fontSize: "20" }}
        to="/about"
      >
        🛈 אודות
      </NavLink>
      <a href="tel:0545597435">☎ צור קשר</a>
      <a href="https://www.iprights.co.il/%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA-%D7%A9%D7%9E%D7%95%D7%A8%D7%95%D7%AA/">
        זכויות שמורות @
      </a>
    </div>
  );
};

export default Footer;
