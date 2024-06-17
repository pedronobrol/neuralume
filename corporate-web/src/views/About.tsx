/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import StandardView from "../components/StandardView";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import TagLine from "../components/TagLine";
import Paragraph from "../components/Paragraph";
import { Link } from "react-router-dom";
import Anchor from "../components/Anchor";
import { useTranslation } from "react-i18next";

const AboutView: React.FC = () => {
    const { t, i18n } = useTranslation();
    return (
        <StandardView pageTitle="Sobre nosotros">
            <Container>
                <SectionHeading>{t("about_us_title")}</SectionHeading>
                <TagLine>{t("about_us_paragraph_1")}</TagLine>
                <Paragraph>{t("about_us_paragraph_2")}</Paragraph>
                <Paragraph>{t("about_us_paragraph_3")}</Paragraph>
                <Paragraph>{t("about_us_paragraph_4")}</Paragraph>
                <Paragraph>
                    {t("about_us_paragraph_5")}{" "}
                    <Anchor link="mailto:contact@neuralume.com">
                        contact@neuralume.com
                    </Anchor>
                    .
                </Paragraph>
            </Container>
        </StandardView>
    );
};

export default AboutView;
