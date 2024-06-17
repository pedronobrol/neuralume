import * as React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const MenuContainer = styled.div`
  padding: 10px 0;
  color: white;
  font-weight: 500;
  font-size: 14pt;
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  padding: 10px 0;
  transition: color 300ms ease-in-out;
  &:hover {
    color: #ec7b8f;
  }
`;

export type MenuItemProps = {
  link: string;
  exact?: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ link, children, exact }) => {
  return (
    <MenuContainer>
      <MenuLink to={link} exact={exact} activeStyle={{ color: "#ec7b8f" }}>
        {children}
      </MenuLink>
    </MenuContainer>
  );
};

export default MenuItem;
