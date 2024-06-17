/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import SubSectionHeading from "../components/SubSectionHeading";
import Paragraph from "../components/Paragraph";
import axios from "axios";
import { API_URL } from "../config";

export type PurchaseCompletedProps = {};

const PurchaseCompleted: React.FC<PurchaseCompletedProps> = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    React.useEffect(() => {
        axios
            .post(`${API_URL}/successful-payment`, {
                sessionId,
            })
            .then((response) => console.log(response))
            .catch((reason) => console.log(reason));
    }, [sessionId]);

    return (
        <div>
            <Container
                css={css`
                    /* margin: 0 auto;
                    max-width: 1000px;
                    width: 100%; */
                    padding-top: 100px;
                `}
            >
                <SubSectionHeading>
                    Su pedido de Nébula ha sido completado.
                </SubSectionHeading>
                <Paragraph>
                    {" "}
                    Gracias por confiar en Neuralume. Su compra ha sido
                    completada con éxito. Le hemos enviado un correo electrónico
                    con los detalles de su pedido. En breve recibirá su(s)
                    dispositivo(s) Nébula a la dirección indicada.
                </Paragraph>
                <Paragraph>
                    Si no ha recibido una confirmación, póngase en contacto con
                    nosotros a través de contact@neuralume.com, indicando el
                    número de referencia: {sessionId}
                </Paragraph>
            </Container>
            <Footer />
        </div>
    );
};

export default PurchaseCompleted;
