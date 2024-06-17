/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Container from "./Container";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Anchor from "./Anchor";
import { useTranslation } from "react-i18next";

const HorizontalLine = styled.hr`
    background-color: none;
    border: none;
    border-top: 1px solid #cecece;
    margin: 20px 0;
`;
const columnStyles = css`
    flex-basis: 30%;
`;

const largeColumnStyles = css`
    flex-basis: 40%;
`;

const Title = styled.span`
    font-weight: 500;
    font-size: 15pt;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
`;

const linkStyle = css`
    padding: 10px 0;
    text-decoration: none;
    color: #606060;
    transition: color 200ms ease-out;

    &:hover {
        color: #302a2a;
    }
`;
const Item: React.FC<{ link: any; extern?: boolean }> = ({
    children,
    link,
    extern,
}) => {
    return (
        <li
            css={css`
                list-style: none;
                margin: 10px 0;
            `}
        >
            {extern ? (
                <a href={link} css={linkStyle}>
                    {children}
                </a>
            ) : (
                <Link to={link} css={linkStyle}>
                    {children}
                </Link>
            )}
        </li>
    );
};

const Menu = () => {
    const { t, i18n } = useTranslation();
    return (
        <div
            css={css`
                display: flex;
                @media (max-width: 600px) {
                    display: block;
                }
            `}
        >
            <div css={columnStyles}>
                <Title>{t("footer_column_products")}</Title>
                <List>
                    <Item link="/nebula">Nebula</Item>
                    <Item extern link="https://cloud.neuralume.com">
                        Neuralume Cloud
                    </Item>
                    {/* <Item extern link="https://certified.neuralume.com">
                        Neuralume Certified&trade;
                    </Item> */}
                </List>
            </div>
            <div css={columnStyles}>
                <Title>{t("footer_column_corporate")}</Title>
                <List>
                    <Item link="/">{t("footer_column_corporate_home")}</Item>
                    <Item link="/about">
                        {t("footer_column_corporate_about_us")}
                    </Item>
                    {/* <Item extern link="https://blog.neuralume.com">
                        Blog
                    </Item> */}
                    {/* <Item link="/legal">Políticas y términos</Item> */}
                </List>
            </div>
            <div css={largeColumnStyles}>
                <Title>{t("footer_column_contact")}</Title>
                <p
                    css={css`
                        margin: 10px 0;
                        font-size: 11pt;
                        color: #606060;
                    `}
                >
                    {t("footer_column_contact_description")}{" "}
                    <Anchor extern link="mailto:contact@neuralume.com">
                        contact@neuralume.com
                    </Anchor>
                    .
                </p>
                {/* <form
                    css={css`
                        display: flex;
                        border-radius: 7px;
                        border: 1px #969696 solid;
                        padding: 2px;
                    `}
                >
                    <input
                        type="text"
                        placeholder="Tu correo electrónico"
                        css={css`
                            font-size: 11pt;
                            border: none;
                            width: 100%;
                            padding: 10px 0px 10px 10px;
                            box-sizing: border-box;
                            display: block;
                            font-family: inherit;
                            background-color: transparent;

                            &:focus {
                                outline: none;
                            }
                        `}
                    />
                    <button
                        type="submit"
                        css={css`
                            background: none;
                            border: none;
                            font-size: 11pt;
                            font-family: inherit;
                            background-color: transparent;

                            &:hover {
                                cursor: pointer;
                            }

                            &:active {
                                color: black;
                            }
                        `}
                    >
                        Enviar
                    </button>
                </form> */}
            </div>
        </div>
    );
};

const Footer: React.FC = () => {
    const { t, i18n } = useTranslation();
    return (
        <footer
            css={css`
                margin: 80px 0 40px;
            `}
        >
            <Container>
                <HorizontalLine />
                <div
                    css={css`
                        display: flex;
                        @media (max-width: 900px) {
                            display: block;
                        }
                    `}
                >
                    <div
                        css={css`
                            flex-basis: 40%;
                            padding-right: 20px;
                            box-sizing: border-box;
                            font-size: 11pt;
                            @media (max-width: 900px) {
                                margin-bottom: 30px;
                            }
                        `}
                    >
                        <Logo height="40px" />
                        <p>{t("footer_line_1")}</p>
                        <p>{t("footer_line_2")}</p>
                    </div>
                    <div
                        css={css`
                            flex-basis: 60%;
                        `}
                    >
                        <Menu />
                    </div>
                </div>

                <HorizontalLine />
                <p
                    css={css`
                        margin: 0;
                    `}
                >
                    &copy; Neuralume Labs Ltd. All rights reserved. Company
                    registered in England and Wales with No. 13031292.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
