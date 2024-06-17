/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { ReactComponent as YesIcon } from "../images/checkmark-outline.svg";
import { ReactComponent as NoIcon } from "../images/close-outline.svg";
import Paragraph from "./Paragraph";
import Container from "./Container";
import { useTranslation } from "react-i18next";

export type FeatureSummaryTableProps = {
    featureList: String[];
    bold?: boolean;
    noMargin?: boolean;
};

const NarrowContainer = styled(Container)`
    margin: 0 auto;
    font-size: 16pt;

    @media screen and (max-width: 900px) {
        font-size: 14pt;
    }
`;

const Table = styled.div``;

const FeatureSummaryTable: React.FC<FeatureSummaryTableProps> = ({
    featureList,
    bold,
    noMargin,
}) => {
    const { t, i18n } = useTranslation();
    return (
        <NarrowContainer
            css={css`
                ${noMargin && "margin: 0 !important; padding: 0 !important;"}
            `}
        >
            <Table>
                <div
                    css={css`
                        display: flex;
                        margin-bottom: 30px;
                        & div {
                            flex-basis: 50%;
                            font-weight: 500;
                            text-align: center;
                        }
                        margin-left: 50%;

                        @media (max-width: 750px) {
                            display: none;
                        }
                    `}
                >
                    <div>Nébula</div>
                    <div>{t("other_devices")}</div>
                </div>
                {featureList.map((item) => (
                    <div
                        css={css`
                            margin: 30px 0;
                            display: flex;

                            @media (max-width: 750px) {
                                display: block;
                                ${bold &&
                                `
                                border: solid #b1aaaa 1px;
                                border-radius: 10px;
                                padding: 20px 10px;
                                `}
                            }
                            align-items: center;
                            ${bold && "font-weight: 500;"}
                            & > div {
                                flex-basis: 50%;
                                text-align: center;
                            }
                            & > div:first-of-type {
                                text-align: left;
                            }

                            @media (max-width: 750px) {
                                & > div:first-of-type {
                                    text-align: center;
                                }
                            }
                        `}
                    >
                        <div>{item}</div>
                        <div
                            css={css`
                                ${!bold &&
                                `@media (max-width: 750px) {
                                            display: none;
                                        }`}
                            `}
                        >
                            <div
                                css={css`
                                    margin-top: 20px;
                                    margin-bottom: 10px;
                                    & div {
                                        flex-basis: 50%;
                                        font-weight: 500;
                                        text-align: center;
                                    }
                                    display: none;
                                    @media (max-width: 750px) {
                                        display: flex;
                                    }
                                `}
                            >
                                <div>Nébula</div>
                                <div>{t("others")}</div>
                            </div>
                            <div
                                css={css`
                                    display: flex;

                                    & > div {
                                        flex-basis: 50%;
                                        text-align: center;
                                    }
                                `}
                            >
                                <div>
                                    <YesIcon color="#28c840" width="40px" />
                                </div>
                                <div>
                                    <NoIcon color="#b1a7a6" width="40px" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Table>
        </NarrowContainer>
    );
};

export default FeatureSummaryTable;
