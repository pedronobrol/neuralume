/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";
import Container from "../components/Container";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Paragraph from "../components/Paragraph";
import SectionHeading from "../components/SectionHeading";
import SubSectionHeading from "../components/SubSectionHeading";

import peleteiroLogo from "../images/peleteiro.svg";
import telemapLogo from "../images/telemap.svg";
import uscLogo from "../images/usc.svg";
import TagLine from "../components/TagLine";

import nebulaImg from "../images/nebula.png";
import FeatureWholePage from "../components/NebulaFeatureWholePage";
import FeatureSummaryTable from "../components/NebulaFeatureSummaryTable";

import { Helmet } from "react-helmet";

const Circle = styled.div`
    width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 100%;
    background-color: ${(props) => props.color};
`;

const RiskLevel: React.FC<{ color: any }> = ({ children, color }) => {
    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                margin: 10px 0;
            `}
        >
            <Circle color={color} />
            <Paragraph
                narrow
                css={css`
                    margin: 0;
                    margin-left: 20px;
                `}
            >
                {children}
            </Paragraph>
        </div>
    );
};

const partnerStyles = css`
    margin: 0 40px;
    filter: grayscale(100%);
    opacity: 0.5;

    height: 50px;
    width: auto;
    cursor: pointer;

    &:hover {
        filter: grayscale(0%);
        opacity: 1;
    }
`;

const NebulaView: React.FC = () => {
    const { t, i18n } = useTranslation();
    document.title = "Nébula - Neuralume";

    const knowMore = () => {
        const offsetTop = document.querySelector<HTMLDivElement>("#knowMore")!
            .offsetTop;

        window.scroll({
            top: offsetTop,
            behavior: "smooth",
        });
    };

    return (
        <div
            css={css`
                /* position: absolute;
                top: 0;
                left: 0;
                height: 100vh;
                width: 100vw; */
                /* border: 1px solid; */
                /* overflow-y: scroll; */
                /* scroll-snap-type: y proximity; */

                /* & .snapStart {
                    scroll-snap-align: start;
                } */
            `}
        >
            <div>
                <div
                    css={css`
                        height: 100vh;
                        width: 100vw;
                        z-index: 2;
                        position: fixed;
                        background: linear-gradient(
                            180deg,
                            rgba(255, 255, 255, 1) 30%,
                            rgba(255, 255, 255, 0.3) 100%
                        );
                    `}
                ></div>
                <div
                    css={css`
                        height: 100vh;
                        width: 100vw;
                        z-index: 1;
                        position: fixed;
                        animation: backgroundAnimation 20s infinite linear;
                        @keyframes backgroundAnimation {
                            0% {
                                background-color: #89d6ed;
                            }
                            50% {
                                background-color: #fabce9;
                            }
                            100% {
                                background-color: #89d6ed;
                            }
                        }
                    `}
                ></div>
            </div>
            <Helmet>
                <title>Nébula - Neuralume</title>
                {/* <style>
                    {`
                            body, html {
                                overflow: hidden !important;
                            }

                       `}
                </style> */}
            </Helmet>
            <div
                className="snapStart"
                css={css`
                    position: relative;
                    z-index: 10;
                `}
            >
                <Header />
            </div>
            <div
                css={css`
                    z-index: 4;
                    position: relative;
                `}
            >
                <Container
                    css={css`
                        text-align: center;
                    `}
                >
                    <div
                        css={css`
                            margin: 50px 0 100px 0;
                        `}
                    >
                        <div
                            css={css`
                                margin-bottom: 80px;
                                @media (max-width: 800px) {
                                    margin-bottom: 50px;
                                }
                            `}
                        >
                            <SectionHeading
                                css={css`
                                    font-weight: 500;
                                    line-height: 40pt;
                                    max-width: 600px;
                                    margin: 0 auto 50px;
                                `}
                            >
                                {t("nebula_title")}
                            </SectionHeading>
                            <Button
                                style="dark"
                                base="button"
                                onClick={knowMore}
                            >
                                {t("nebula_know_more_button")}
                            </Button>
                        </div>
                        <img
                            alt=""
                            draggable={false}
                            src={nebulaImg}
                            css={css`
                                height: auto;
                                width: 900px;

                                @media (max-width: 1300px) {
                                    width: 800px;
                                }
                                @media (max-width: 1000px) {
                                    width: 600px;
                                }
                                @media (max-width: 800px) {
                                    width: 90vw;
                                }
                            `}
                        />
                    </div>
                </Container>
                <Container
                    id="knowMore"
                    className="snapStart"
                    css={css`
                        text-align: center;
                    `}
                >
                    <SectionHeading>{t("nebula_meet_heading")}</SectionHeading>
                    <TagLine narrow>{t("nebula_meet_description")}</TagLine>
                </Container>

                <FeatureWholePage
                    infoFeature={t("nebula_info_feature_precision_title")}
                >
                    <Paragraph>
                        {t("nebula_info_feature_precision_description_1")}
                    </Paragraph>
                    <Paragraph>
                        {t("nebula_info_feature_precision_description_2")}
                    </Paragraph>
                    {/* <div
                        css={css`
                            height: 70vh;
                            background-image: url(${nebulaSemaforo});
                            width: 100%;
                            background-size: contain;
                            background-repeat: no-repeat;
                            background-position-x: center;
                            margin: 0 auto;
                        `}
                    /> */}
                </FeatureWholePage>
                <FeatureWholePage
                    infoFeature={t("nebula_info_feature_risk_title")}
                >
                    <Paragraph>
                        {t("nebula_info_feature_risk_description_1")}
                    </Paragraph>
                    <Paragraph>
                        {t("nebula_info_feature_risk_description_2")}
                    </Paragraph>
                    {/* 
                    <div
                        css={css`
                            height: 50vh;
                            background-image: url(${reunionImg});
                            width: 100%;
                            background-size: contain;
                            background-repeat: no-repeat;
                            background-position-x: center;
                            margin: 0 auto;

                            @media (max-width: 700px) {
                                background-size: cover;
                            }
                        `}
                    /> */}
                </FeatureWholePage>
                <FeatureWholePage
                    infoFeature={t("nebula_info_feature_cloud_title")}
                >
                    <Paragraph>
                        {t("nebula_info_feature_cloud_description_1")}
                    </Paragraph>
                    <Paragraph>
                        {t("nebula_info_feature_cloud_description_2")}
                    </Paragraph>
                </FeatureWholePage>
                <FeatureWholePage
                    infoFeature={t("nebula_info_feature_reports_title")}
                >
                    <Paragraph>
                        {t("nebula_info_feature_reports_description_1")}
                    </Paragraph>
                    <Paragraph>
                        {t("nebula_info_feature_reports_description_2")}
                    </Paragraph>
                </FeatureWholePage>
                <FeatureWholePage
                    infoFeature={t("nebula_info_feature_certified_title")}
                >
                    <Paragraph>
                        {t("nebula_info_feature_certified_description_1")}
                    </Paragraph>
                    <Paragraph>
                        {t("nebula_info_feature_certified_description_2")}
                    </Paragraph>
                </FeatureWholePage>
                <div
                    className="snapStart"
                    css={css`
                        padding-top: 50px;
                        padding-bottom: 20px;
                        margin-top: 100px;
                        background-color: white;
                        width: 100%;
                    `}
                >
                    <Container
                        css={css`
                            margin-bottom: 100px;
                        `}
                    >
                        <SubSectionHeading
                            css={css`
                                text-align: center;
                            `}
                        >
                            {t("nebula_summary_title")}
                        </SubSectionHeading>
                        <FeatureSummaryTable
                            noMargin
                            featureList={[
                                t("nebula_info_feature_precision_title"),
                                t("nebula_info_feature_risk_title"),
                                t("nebula_info_feature_cloud_title"),
                                t("nebula_info_feature_reports_title"),
                                t("nebula_info_feature_certified_title"),
                            ]}
                        />
                    </Container>
                    <Container
                        css={css`
                            padding: 100px 0;
                        `}
                    >
                        <div
                            css={css`
                                display: flex;
                                justify-content: center;
                                @media (max-width: 900px) {
                                    display: block;
                                    & > img {
                                        display: block;
                                        margin: 50px auto;
                                        height: 40px;
                                    }
                                }
                            `}
                        >
                            <img
                                src={peleteiroLogo}
                                alt=""
                                draggable={false}
                                css={partnerStyles}
                            />
                            <img
                                src={uscLogo}
                                alt=""
                                draggable={false}
                                css={css`
                                    ${partnerStyles} height: 90px;
                                    margin-top: -20px;
                                `}
                            />
                            <img
                                src={telemapLogo}
                                alt=""
                                draggable={false}
                                css={partnerStyles}
                            />
                        </div>
                    </Container>
                    <Container>
                        <div
                            css={css`
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin: 100px 0 50px 0;
                                @media (max-width: 900px) {
                                    display: block;
                                    text-align: center;
                                }
                            `}
                        >
                            <SectionHeading
                                css={css`
                                    margin: 0;
                                    @media (max-width: 900px) {
                                        font-size: 20pt;
                                        line-height: 20pt;
                                        margin-bottom: 30px;
                                    }
                                `}
                            >
                                {t("nebula_catchline_title")}
                            </SectionHeading>
                            <Button link="/nebula/preorder" style="dark">
                                {t("nebula_catchline_button")}
                            </Button>
                        </div>
                    </Container>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default NebulaView;
