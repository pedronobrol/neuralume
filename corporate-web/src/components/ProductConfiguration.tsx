/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

const Title = styled.span`
    font-weight: 500;
    font-size: 16pt;
    color: #333;
`;

export type ProductConfigProps = {
    title: string;
    vertical?: boolean;
};

const ProductConfig: React.FC<ProductConfigProps> = ({
    title,
    children,
    vertical,
}) => {
    return (
        <div
            css={css`
                margin-bottom: 20px;
            `}
        >
            <Title>{title}</Title>
            <div
                css={css`
                    margin-top: 10px;
                    display: flex;

                    ${vertical &&
                    css`
                        flex-direction: column;
                        & > div.configOption {
                            min-height: 50px;
                            margin: 5px 0;
                            &:first-of-type {
                                margin-top: 0;
                            }
                            &:last-of-type {
                                margin-bottom: 0;
                            }
                        }
                    `}
                `}
            >
                {children}
            </div>
        </div>
    );
};

export type ProductConfigOptionProps = {
    active: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const ProductConfigOption: React.FC<ProductConfigOptionProps> = ({
    children,
    active,
    onClick,
}) => {
    return (
        <div
            className="configOption"
            onClick={onClick}
            css={css`
                border: 2px solid #c6cdd0;
                width: 100%;
                margin: 0 10px;
                padding: 20px;
                border-radius: 7px;
                box-sizing: border-box;
                transition: 200ms all ease-out;
                display: flex;
                align-items: center;
                &:first-of-type {
                    margin-left: 0;
                }
                &:last-of-type {
                    margin-right: 0;
                }
                cursor: pointer;
                ${!active &&
                css`
                    &:hover {
                        border: 2px solid #7faee8;
                    }
                `}

                ${active && "border: 2px solid #357dd5;"}
            `}
        >
            {children}
        </div>
    );
};

export default ProductConfig;
