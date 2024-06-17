/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { Link } from "react-router-dom";
import { css, jsx } from "@emotion/react";
import Logo from "../components/Logo";

const Header: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Link to="/">
        <Logo height="30px" />
      </Link>
      <div>
        <Link
          css={css`
            text-decoration: none;
            color: #39414f;
            padding: 10px 10px;
            border-radius: 7px;
            transition: all 200ms ease-out;

            &:hover {
              background-color: rgb(246, 131, 129);
              color: white;
            }
          `}
          to="/auth/logout"
        >
          Cerrar sesión
        </Link>
      </div>
    </div>
  );
};

export default Header;
