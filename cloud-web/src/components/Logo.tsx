/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";

import logo from "../images/logo.svg";

export type LogoProps = {
  height?: string;
};

const Logo: React.FC<LogoProps> = ({ height }) => {
  const logoStyles = css`
    height: ${height || "30px"};
    width: auto;
  `;
  return <img css={logoStyles} alt="" draggable={false} src={logo} />;
};

export default Logo;
