import { Button } from "@mui/material/index";
import React from "react";
import { Link } from "react-router-dom";
import { ContainerStyled } from "./NavBar.style";

const NavBar = props => {
  return (
    <ContainerStyled>
      <Button></Button>
      <Link to="/">Home</Link>
      <Link to="/stay">Stay</Link>
      <Link to="/experience">Experience</Link>
      <Link to="/share">Share</Link>
      <Link to="/shop">Shop</Link>
    </ContainerStyled>
  );
};

NavBar.propTypes = {};

export default NavBar;
