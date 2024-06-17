/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactComponent as CloseIcon } from "../images/close-outline.svg";

export type PopUpMessageProps = {
    onClose: () => void;
};

const PopUpMessage: React.FC<PopUpMessageProps> = ({ children, onClose }) => {
    return (
        <div
            css={css`
                position: fixed;
                height: 100vh;
                width: 100vw;
                top: 0;
                left: 0;
                background-color: rgba(255, 255, 255, 0.7);
                display: flex;
                align-items: center;
                align-content: center;
                justify-content: center;
                justify-items: center;
            `}
        >
            <div
                css={css`
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: 100vw;
                    background-color: transparent;
                    z-index: 2;
                    cursor: pointer;
                `}
                onClick={onClose}
            />
            <div
                css={css`
                    z-index: 3;
                    background-color: white;
                    min-height: 50px;
                    border-radius: 5px;
                    width: 100%;
                    max-width: 700px;
                    border: 1px solid #ababab;
                    padding: 20px;
                    padding-top: 50px;
                    margin: 20px;
                    position: relative;
                `}
            >
                <CloseIcon
                    onClick={onClose}
                    css={css`
                        cursor: pointer;
                        height: 40px;
                        position: absolute;
                        right: 10px;
                        top: 10px;
                    `}
                />
                {children}
            </div>
        </div>
    );
};

export default PopUpMessage;
