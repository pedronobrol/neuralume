/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

export const baseButtonStyles = css`
    text-decoration: none;
    appearance: none;
    outline: none;
    border: none;
    border-style: none;

    height: 45px;
    box-sizing: border-box;
    background-color: #171634;
    font-weight: 500;
    color: white;

    border-radius: 7px;
    font-size: 12pt;
    cursor: pointer;
    font-family: "IBM Plex Sans";
    padding: 12px 30px;
    margin: 0px 10px;
    text-align: center;
    text-transform: uppercase;
    box-shadow: 0px 3px 8px -2px rgba(18, 17, 43, 0.65);
    transition: background-color 200ms ease-out;

    outline: none;

    &:last-of-type {
        margin-right: 0;
    }

    &:first-of-type {
        margin-left: 0;
    }
    &:hover {
        background-color: #282742;
    }
    @media (max-width: 600px) {
        padding: 12px;
    }
`;

export const transparentButtonStyles = css`
    ${baseButtonStyles}
    color: #171634;
    background-color: transparent;
    box-shadow: none;
    &:hover {
        box-shadow: none;
        background-color: transparent;
    }
`;

export const blueButtonStyles = css`
    ${baseButtonStyles}

    background-color: #3163ba;
    box-shadow: 0px 3px 8px -2px #52546c;
`;

export type ButtonProps = {
    base?: "a" | "button";
    link?: any;
    onClick?: any;
    extern?: boolean;
    style: "dark" | "transparent" | "blue";
    type?: "button" | "submit" | "reset";
    display?: "block" | "inline" | "inline-block";
    extraStyles?: any;
};

const buttonStyles = {
    dark: baseButtonStyles,
    transparent: transparentButtonStyles,
    blue: blueButtonStyles,
};

const Button: React.FC<ButtonProps> = ({
    base,
    link,
    children,
    onClick,
    style,
    display,
    type,
    extern,
    extraStyles,
}) => {
    const styles = [
        buttonStyles[style],
        css`
            ${display && `display: ${display}`}
        `,
        extraStyles,
    ];
    if (base === "button")
        return (
            <button onClick={onClick} css={styles} type={type}>
                {children}
            </button>
        );
    else if (base === "a" || extern)
        return (
            <a href={link} css={styles}>
                {children}
            </a>
        );
    else
        return (
            <Link to={link} css={styles}>
                {children}
            </Link>
        );
};

export default Button;
