import styled from "@emotion/styled";
import { useTheme } from "@mui/system";
import React from "react";
import { LinkStyled, NavLinkStyled } from "../../../components";
import { account } from "../../../routers";
import { MenuContainerStyled } from "../styles";

const Menu = ({ url }) => {
  const theme = useTheme();
  return (
    <MenuContainerStyled>
      {account[0].children.map(item => (
        <LinkLabel
          key={item.path}
          to={item.redirect}
          style={({ isActive }) => ({
            color: isActive && theme.palette.secondary.main
          })}>
          {item.name}
        </LinkLabel>
      ))}
    </MenuContainerStyled>
  );
};
const LinkLabel = styled(NavLinkStyled)`
  padding: 10px 20px;
  white-space: nowrap;
`;
export default Menu;
