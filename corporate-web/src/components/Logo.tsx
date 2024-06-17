/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";

import logo from "../images/logo.svg";
import logoText from "../images/logoText.svg";

export type LogoProps = {
    height?: string;
    text?: boolean;
};

const Logo: React.FC<LogoProps> = ({ height, text }) => {
    const logoStyles = css`
        height: ${height || "30px"};
        width: auto;
    `;
    return (
        <img
            css={logoStyles}
            alt=""
            draggable={false}
            src={text ? logoText : logo}
        />
    );
};

export default Logo;
