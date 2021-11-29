import styled from "@emotion/styled";
import { useTheme } from "@mui/system";
import React from "react";
import { LinkStyled, NavLinkStyled } from "../../../components";
import { account } from "../../../utils/paths";
import { MenuContainerStyled } from "../styles";

const Menu = ({ url }) => {
  const theme = useTheme();
  return (
    <MenuContainerStyled>
      {account[1].nested.map(item => (
        <LinkLabel
          key={item.path}
          to={item.path}
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
`;
export default Menu;
