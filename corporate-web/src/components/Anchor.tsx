/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

export type AnchorProps = {
    extern?: boolean;
    noUnderline?: boolean;
    link?: string;
    onClick?: () => void;
};

const Anchor: React.FC<AnchorProps> = ({
    link,
    extern,
    noUnderline,
    children,
    onClick,
}) => {
    const linkStyles = css`
        color: #dc6ba6;
        text-decoration: none;
        ${!noUnderline && `border-bottom: 2px solid #dc6ba6;`}
        padding-bottom: 2px;
        margin-bottom: -2px;
        transition: all 200ms ease-out;
        cursor: pointer;

        &:hover {
            color: #f68382;
            ${!noUnderline && `border-bottom: 2px solid #f68382;`}
        }
    `;
    if (extern)
        return (
            <a href={link} css={linkStyles} onClick={onClick}>
                {children}
            </a>
        );
    return (
        <Link to={link || ""} css={linkStyles}>
            {children}
        </Link>
    );
};

export default Anchor;
