import React, { useEffect, useState } from "react";
import "./css/nav.css";

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "navBlack"}`}>
      <img className="logo" src="./Netflix.png" alt="Netflix logo" />
      <img
        className="avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Avatar"
      />
    </div>
  );
};

export default Nav;
