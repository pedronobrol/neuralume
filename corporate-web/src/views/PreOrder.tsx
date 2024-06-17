/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import StandardView from "../components/StandardView";

import Product from "../components/Product";
import ProductConfig from "../components/ProductConfiguration";
import ProductSubscriptionPlan from "../components/ProductSubscriptionPlan";
import ProductAmountField from "../components/ProductAmountField";
import Button from "../components/Button";
import Anchor from "../components/Anchor";
import Paragraph from "../components/Paragraph";
import CheckoutForm from "../components/CheckoutForm";

import nebulaImage from "../images/nebula.png";
import PopUpMessage from "../components/PopUpMessage";

// const stripePromise = loadStripe(
//     "pk_test_51IB6UdJbXjVSLCa48PKE5dJnOXxiuDY4I3eaLucApOmQDkz5U7GxhE6JvqTIRJHKialr4mYGwJda2d6BVSggtVJF00anQksrzQ",
//     { locale: "es" }
// );

const monthBasePrice = 29;
const yearBasePrice = 19;

function AmountHelp() {
    const [displayPopup, setDisplayPopup] = React.useState<boolean>(false);
    return (
        <div
            css={css`
                margin-bottom: 10px;
            `}
        >
            <Anchor noUnderline extern onClick={() => setDisplayPopup(true)}>
                ¿Cuántas unidades necesito?
            </Anchor>
            {displayPopup && (
                <PopUpMessage onClose={() => setDisplayPopup(false)}>
                    <Paragraph>
                        Dependiendo de las dimensiones de su establecimiento u
                        oficinas, el número de dispositivos Nébula necesario
                        varía. Recomendamos instalar una Nébula por cada
                        estancia que se encuentre delimitada por una puerta que
                        desee monitorizar, o una por cada 50 m<sup>2</sup> para
                        habitaciones muy grandes. Puede ponerse en contacto con
                        nuestro servicio técnico para más información.
                    </Paragraph>
                </PopUpMessage>
            )}
        </div>
    );
}

type Stage = "init" | "billingDetails";

const Saving = styled.div`
    font-size: 11pt;
    margin-top: 2px;
    padding: 3px 6px;
    background-color: #d7f7f0;
    color: #2e7461;
    font-weight: 500;
    border-radius: 7px;
`;

const PreOrderView: React.FC<{ cancelled?: boolean }> = ({ cancelled }) => {
    // const [subscriptionMode, setSubscriptionMode] = React.useState<
    //     "monthly" | "yearly"
    // >("yearly");
    const urlParams = new URLSearchParams(window.location.search);
    const offerCode = urlParams.get("offer_code");
    const units = urlParams.get("amount");
    const editable = units === undefined || units === null;
    const [amount, setAmount] = React.useState<string>(units || "1");
    const [stage, setStage] = React.useState<Stage>("init");
    const [
        displaySubscriptionPopUp,
        setDisplaySubscriptionPopUp,
    ] = React.useState<boolean>(false);

    const hasOffer = offerCode !== null && offerCode !== undefined;
    console.log(offerCode);
    // function getPricePerMonth(
    //     subscriptionMode: "monthly" | "yearly",
    //     amountInput?: number
    // ): number {
    //     const amountInt = amountInput || parseInt(amount);
    //     if (amountInt <= 0) return getPricePerMonth(subscriptionMode, 1);
    //     switch (subscriptionMode) {
    //         case "yearly":
    //             return parseInt(amount) * yearBasePrice;
    //         case "monthly":
    //         default:
    //             return parseInt(amount) * monthBasePrice;
    //     }
    // }

    function getUnitPrice() {
        const amountInt = parseInt(amount);
        if (!hasOffer) {
            return 279;
        }
        if (amountInt === 1) return 249;
        if (1 < amountInt && amountInt < 5) return 239;
        if (5 <= amountInt && amountInt < 10) return 229;
        if (10 <= amountInt && amountInt < 20) return 219;
        if (20 <= amountInt && amountInt < 50) return 209;
        if (50 <= amountInt && amountInt < 100) return 199;
        if (100 <= amountInt && amountInt < 500) return 189;
        return 179;
    }

    function getTotalPrice() {
        const amountInt = parseInt(amount);
        return getUnitPrice() * amountInt;
    }
    function getSubscriptionPrice() {
        const amountInt = parseInt(amount);
        return 7 * amountInt;
    }
    function getSavingFraction() {
        const unitPrice = getUnitPrice();
        return Math.ceil((1 - unitPrice / 279) * 100);
    }

    return (
        <StandardView
            pageTitle="Compre ahora su Nébula"
            headerProps={{ excludePreOrder: true }}
        >
            <Product productName="Nébula" productImage={nebulaImage}>
                <div
                    css={css`
                        ${stage !== "init" && "display: none;"}
                    `}
                >
                    {cancelled && (
                        <div
                            css={css`
                                background-color: #df8b8b;
                                border-radius: 7px;
                                padding: 10px;
                                margin-bottom: 10px;
                                color: #832828;
                                font-weight: 500;
                            `}
                        >
                            El pago del producto no ha sido completado. Por
                            favor, inténtelo de nuevo.
                        </div>
                    )}
                    <ProductConfig
                        vertical
                        title={editable ? "Elija el número de unidades" : ""}
                    >
                        {editable && <AmountHelp />}
                        {!editable && (
                            <div
                                css={css`
                                    font-size: 14pt;
                                `}
                            >
                                Descubra su oferta personalizada:
                            </div>
                        )}
                        <ProductAmountField
                            editable={editable}
                            hasOffer={hasOffer}
                            setValue={setAmount}
                            value={amount}
                        />
                    </ProductConfig>
                    <div
                        css={css`
                            border: 2px solid #c6cdd0;
                            width: 100%;
                            margin: 0;
                            padding: 20px;
                            border-radius: 7px;
                            box-sizing: border-box;
                            transition: 200ms all ease-out;
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <div>
                            <div
                                css={css`
                                    display: ${hasOffer ? "flex" : "none"};
                                    justify-content: space-between;
                                `}
                            >
                                <div>
                                    <div
                                        css={css`
                                            text-decoration: line-through;
                                            font-weight: 400;
                                            text-decoration-thickness: 1px;
                                            font-style: italic;
                                            color: #575757;
                                            font-size: 14pt;
                                        `}
                                    >
                                        279 €
                                    </div>
                                </div>
                                <div>
                                    <Saving>
                                        Ahorra {getSavingFraction()}%
                                    </Saving>
                                </div>
                            </div>
                            <div>
                                <div
                                    css={css`
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                    `}
                                >
                                    <div
                                        css={css`
                                            font-size: 18pt;
                                            font-weight: 500;
                                        `}
                                    >
                                        {getUnitPrice()} € / dispositivo
                                    </div>
                                </div>
                            </div>
                            <div
                                css={css`
                                    color: #484848;
                                    margin-top: 10px;
                                `}
                            >
                                1 año de Neuralume Cloud gratis. Después, se
                                renueva por {getSubscriptionPrice()} €/mes.
                            </div>
                        </div>
                    </div>
                    {/* <ProductConfig vertical title="Elija la modalidad de pago">
                        <ProductSubscriptionPlan
                            active={subscriptionMode === "yearly"}
                            onClick={() => setSubscriptionMode("yearly")}
                            pricePerMonth={getPricePerMonth("yearly")}
                            planTitle="Anual"
                            saving="Ahorra 35%"
                            billingSummary={`Facturado en un pago de ${
                                12 * getPricePerMonth("yearly")
                            } €`}
                        />
                        <ProductSubscriptionPlan
                            active={subscriptionMode === "monthly"}
                            onClick={() => setSubscriptionMode("monthly")}
                            pricePerMonth={getPricePerMonth("monthly")}
                            planTitle="Mensual"
                        />
                    </ProductConfig> */}
                    <Paragraph>
                        Reserve hoy y le haremos llegar su pedido entre 5 y 10
                        días laborables. Su suscripción no comenzará hasta que
                        reciba y active el producto. Puede pausar o cancelar en
                        cualquier momento.
                    </Paragraph>
                    <div
                        css={css`
                            /* border-top: 2px solid #8a8a8a;
                            padding-top: 10px; */
                            font-size: 14pt;
                            font-weight: 500;
                            margin-bottom: -10px;
                        `}
                    >
                        Total: {getTotalPrice()} € (IVA no incluido)
                    </div>
                    <Button
                        type="button"
                        base="button"
                        style="blue"
                        display="block"
                        extraStyles={css`
                            margin-top: 30px;
                            width: 100%;
                        `}
                        onClick={() => setStage("billingDetails")}
                    >
                        Comprar
                    </Button>
                    <Paragraph
                        css={css`
                            font-size: 13pt;
                        `}
                    >
                        <Anchor
                            noUnderline
                            extern
                            onClick={() => setDisplaySubscriptionPopUp(true)}
                        >
                            Conozca más sobre el modelo de suscripción
                        </Anchor>
                        {displaySubscriptionPopUp && (
                            <PopUpMessage
                                onClose={() =>
                                    setDisplaySubscriptionPopUp(false)
                                }
                            >
                                <Paragraph>
                                    Neuralume Cloud es un servicio en la nube
                                    que permite almacenar las mediciones
                                    históricas de sus dispositivos Nébula,
                                    analizar el riesgo de contagio, y generar
                                    informes. La compra de Nébula incluye un año
                                    gratuito de Neuralume Cloud. Pasado este
                                    tiempo, puede renovar su suscripción, o
                                    continuar utilizando el producto en modo
                                    offline de forma gratuita.{" "}
                                </Paragraph>
                            </PopUpMessage>
                        )}
                    </Paragraph>
                </div>
                <div
                    css={css`
                        ${stage !== "billingDetails" && "display: none;"}
                    `}
                >
                    <CheckoutForm
                        // pricePerMonth={getPricePerMonth(subscriptionMode)}
                        amount={parseInt(amount)}
                        offerCode={offerCode}
                        // subscriptionMode={subscriptionMode}
                        goBack={() => setStage("init")}
                    />
                </div>
            </Product>
        </StandardView>
    );
};

export default PreOrderView;
