/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Logo from "./Logo";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type HeaderProps = {
    excludePreOrder?: boolean;
};

const Header: React.FC<HeaderProps> = ({ excludePreOrder }) => {
    const { t, i18n } = useTranslation();
    return (
        <div
            css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                max-width: 1200px;
                margin: 0 auto;
                padding: 30px 50px;
                @media (max-width: 800px) {
                    padding: 30px 20px;
                }
            `}
        >
            <div>
                <Link to="/">
                    <Logo height="40px" />
                </Link>
            </div>
            <div
                css={css`
                    ${excludePreOrder &&
                    css`
                        & a {
                            padding-right: 0;
                        }
                    `}
                `}
            >
                <Button
                    style="transparent"
                    extern
                    link="https://cloud.neuralume.com"
                >
                    {t("log_in_button")}
                </Button>
                {!excludePreOrder && (
                    <Button style="dark" link="/nebula/preorder">
                        {t("pre_order_button")}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
