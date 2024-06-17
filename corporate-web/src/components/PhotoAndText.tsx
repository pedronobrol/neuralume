/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

export type PhotoAndTextProps = {
    side: "left" | "right";
    imageSize?: "large" | "medium" | "small";
    image: any;
};

const Container = styled.div`
    display: flex;
    margin: 100px 0;

    @media (max-width: 900px) {
        display: block;
    }
`;

export type PhotoContainerProps = {
    image: any;
    imageSize: "large" | "medium" | "small";
    side: "left" | "right";
};

const PhotoContainer: React.FC<PhotoContainerProps> = ({
    image,
    imageSize,
    side,
}) => {
    const containerSyles = css`

        background-image: url(${image});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 300px;
        ${
            imageSize === "medium" &&
            css`
                flex-basis: 50%;
                height: 400px;
            `
        }

        ${
            imageSize === "large" &&
            css`
                flex-basis: 66.66%;
                height: 500px;
            `
        }

        ${
            imageSize === "small" &&
            css`
                flex-basis: 33.33%;
            `
        }

        ${
            side === "left" &&
            css`
                margin-left: 20px;
            `
        }

        ${
            side === "right" &&
            css`
                margin-right: 20px;
            `
        }
      


        @media (max-width: 900px) {
            width: 100%;
            margin: 0;
        }
    }
    `;
    return <div css={containerSyles} />;
};

export type TextContainerProps = {
    imageSize: "large" | "medium" | "small";
    side: "left" | "right";
};

const TextContainer: React.FC<TextContainerProps> = ({
    imageSize,
    side,
    children,
}) => {
    const containerStyles = css`
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 100%;
        flex-basis: 100%;
        max-width: 800px;
        margin: 0 auto;

        @media (max-width: 900px) {
            width: 100%;
            margin: 0;
            margin-bottom: 50px;
        }

        ${imageSize === "medium" &&
        css`
            flex-basis: 50%;
        `}

        ${imageSize === "large" &&
        css`
            flex-basis: 33.34%;
        `}

        ${imageSize === "small" &&
        css`
            flex-basis: 66.67%;
        `}

        ${side === "left" &&
        css`
            margin-right: 20px;
        `}

        ${side === "right" &&
        css`
            margin-left: 20px;
        `}
    `;
    return <div css={containerStyles}>{children}</div>;
};

const PhotoAndText: React.FC<PhotoAndTextProps> = ({
    side,
    imageSize,
    image,
    children,
}) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const updateCollapsed = () => {
        if (collapsed && window.innerWidth > 900) setCollapsed(false);
        if (!collapsed && window.innerWidth <= 900) setCollapsed(true);
    };

    React.useEffect(() => {
        updateCollapsed();
        window.addEventListener("resize", updateCollapsed);
        return () => {
            window.removeEventListener("resize", updateCollapsed);
        };
    });

    const photoComponent = (
        <PhotoContainer
            image={image}
            imageSize={imageSize || "medium"}
            side={side}
        />
    );
    const textComponent = (
        <TextContainer imageSize={imageSize || "medium"} side={side}>
            {children}
        </TextContainer>
    );
    const leftStructure = (
        <React.Fragment>
            {textComponent} {photoComponent}
        </React.Fragment>
    );
    const rightStructure = (
        <React.Fragment>
            {photoComponent} {textComponent}
        </React.Fragment>
    );

    return (
        <Container>
            {collapsed || side === "left" ? leftStructure : rightStructure}
        </Container>
    );
};

export default PhotoAndText;
