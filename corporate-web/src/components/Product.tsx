/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Container from "./Container";
import SubSectionHeading from "./SubSectionHeading";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiPackage, FiTruck } from "react-icons/fi";
import Anchor from "./Anchor";
import Button from "./Button";
import PopUpMessage from "./PopUpMessage";
import Paragraph from "./Paragraph";

export type ProductProps = {
    productName: string;
    productImage: string;
};

const ProductCardContainer = styled.div`
    display: flex;
    margin-top: 50px;
    @media (max-width: 900px) {
        display: block;
        margin-top: 10px;
    }
`;

const ProductTitle = styled.h1`
    font-size: 24pt;
    line-height: 26pt;
    font-weight: 500pt;
    margin: 0;
`;

const ProductImageContainer = styled.div`
    flex-basis: 60%;
    flex-grow: 0;
    padding-right: 20px;
    box-sizing: border-box;

    @media (max-width: 900px) {
        display: none;
    }
`;

const ContentContainer = styled.div`
    padding-left: 20px;
    flex-basis: 40%;
    @media (max-width: 900px) {
        padding-left: 0;
    }
`;

const FeatureCard: React.FC<{ text: string }> = ({ text, children }) => {
    return (
        <div
            css={css`
                text-align: center;
            `}
        >
            <div
                css={css`
                    font-size: 40px;
                    color: #afaebd;
                    line-height: 40px;
                `}
            >
                {children}
            </div>
            <div
                css={css`
                    font-weight: 500;
                    font-size: 10.5pt;
                    color: #45454f;
                `}
            >
                {text}
            </div>
        </div>
    );
};

const NewCard = () => {
    return (
        <div
            css={css`
                color: #eb4d84;
                font-weight: 500;
                font-size: 12pt;
                text-transform: uppercase;
                margin-bottom: 10px;
            `}
        >
            Nuevo
        </div>
    );
};

const Image = styled.div`
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 500px;
`;

const Product: React.FC<ProductProps> = ({
    children,
    productImage,
    productName,
}) => {
    const [
        displaySpecialistPopup,
        setDisplaySpecialistPopup,
    ] = React.useState<boolean>(false);
    

    return (
        <Container>
            <ProductCardContainer>
                <ProductImageContainer>
                    <Image
                        css={css`
                            background-image: url(${productImage});
                        `}
                    />
                    <div>
                        <div
                            css={css`
                                display: flex;
                                margin-top: 40px;
                                align-items: center;
                                justify-content: space-around;
                            `}
                        >
                            <FeatureCard text="Envío rápido, gratuito y sin contacto.">
                                <FiPackage />
                            </FeatureCard>
                            <FeatureCard text="Devoluciones fáciles y gratuitas.">
                                <FiTruck />
                            </FeatureCard>
                        </div>
                        <div
                            css={css`
                                display: flex;
                                align-items: center;
                                margin-top: 40px;
                            `}
                        >
                            <div
                                css={css`
                                    font-size: 30px;
                                    padding-right: 20px;
                                    box-sizing: border-box;
                                    line-height: 30px;
                                `}
                            >
                                <IoChatbubblesOutline />
                            </div>
                            <div>
                                <div
                                    css={css`
                                        font-weight: 500;
                                    `}
                                >
                                    ¿Alguna duda sobre los pagos o el producto?
                                </div>
                                <div>
                                    <Anchor
                                        extern
                                        onClick={() =>
                                            setDisplaySpecialistPopup(true)
                                        }
                                    >
                                        Hable con un especialista de Neuralume
                                    </Anchor>
                                    {displaySpecialistPopup && (
                                        <PopUpMessage
                                            onClose={() =>
                                                setDisplaySpecialistPopup(false)
                                            }
                                        >
                                            <Paragraph>
                                                Si desea hablar con un
                                                especialista de Neuralume, puede
                                                hacerlo poniéndose en contacto
                                                con nuestro servicio de atención
                                                al cliente:{" "}
                                                <Anchor
                                                    extern
                                                    link="tel:0034981783670"
                                                >
                                                    (+34) 981 78 36 70
                                                </Anchor>{" "}
                                                (lunes a viernes, de 12pm a 6pm)
                                                o envíe un correo a{" "}
                                                <Anchor
                                                    extern
                                                    link="mailto:contact@neuralume.com"
                                                >
                                                    contact@neuralume.com
                                                </Anchor>
                                            </Paragraph>
                                        </PopUpMessage>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </ProductImageContainer>
                <ContentContainer>
                    <div
                        css={css`
                            margin-bottom: 20px;
                        `}
                    >
                        <NewCard />
                        <ProductTitle>{productName}</ProductTitle>
                        <img
                            css={css`
                                display: none;
                                width: 80%;
                                height: auto;
                                margin: 10px auto;

                                @media (max-width: 900px) {
                                    display: block;
                                }
                            `}
                            draggable={false}
                            src={productImage}
                        />
                    </div>
                    {children}
                </ContentContainer>
            </ProductCardContainer>
        </Container>
    );
};

export default Product;
