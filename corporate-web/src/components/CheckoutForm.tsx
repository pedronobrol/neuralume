/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { useState } from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import axios from "axios";

import Field from "./FormField";
import Button from "./Button";
import ShadowBox from "./ShadowBox";
import Paragraph from "./Paragraph";
import { loadStripe } from "@stripe/stripe-js";

import stripeImage from "../images/stripe.svg";
import { IoLockClosedOutline, IoArrowBackSharp } from "react-icons/io5";
import { API_URL, STRIPE_API_KEY } from "../config";

type SessionDetails = {
    companyName: string;
    name: string;
    email: string;
    phone: string;
};

const Form = styled.form`
    animation: fade 200ms ease-out;
`;

type CheckoutFormProps = {
    amount: number;
    // subscriptionMode: "monthly" | "yearly";
    goBack: () => void;
    // pricePerMonth: number;
};

type SummaryBoxProps = CheckoutFormProps;

const SummaryBox: React.FC<SummaryBoxProps> = ({
    amount,
    // pricePerMonth,
    // subscriptionMode,
    goBack,
}) => {
    return (
        <div
            css={css`
                padding: 20px;
                background-color: #e8edf0;
                border-radius: 7px;
                font-size: 12pt;
            `}
        >
            <div
                css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                `}
            >
                <span
                    css={css`
                        font-weight: 500;
                    `}
                >
                    Resumen
                </span>
                <Button
                    style="transparent"
                    extraStyles={css`
                        padding: 0;
                        height: auto;
                        @media (max-width: 900px) {
                            padding: 0;
                        }
                    `}
                    base="button"
                    onClick={goBack}
                >
                    Editar
                </Button>
            </div>
            {amount} Nébula por {amount * 279} &euro;
            {/* {subscriptionMode === "monthly" ? "mensual" : "anual"} */}
        </div>
    );
};

const CheckoutForm: React.FC<
    CheckoutFormProps & { offerCode: string | undefined | null }
> = ({
    offerCode,
    amount,
    goBack,
    // subscriptionMode,
    // pricePerMonth,
}) => {
    const [waiting, setWaiting] = React.useState<boolean>(false);
    const { register, handleSubmit, watch, errors } = useForm<SessionDetails>();

    const onSubmit = async (data: SessionDetails) => {
        if (waiting) return;
        setWaiting(true);
        console.log(offerCode)
        const stripe = await loadStripe(
            STRIPE_API_KEY
        );
        axios
            .post(`${API_URL}/create-payment-session`, {
                ...data,
                amount,
                offerCode,
                // subscriptionMode,
            })
            .then((session) => {
                setWaiting(false);
                stripe!.redirectToCheckout({ sessionId: session.data.id });
            })
            .catch((reason) => {
                setWaiting(false);
                console.log(reason);
            });
    };

    return (
        <div>
            <SummaryBox
                // pricePerMonth={pricePerMonth}
                amount={amount}
                // subscriptionMode={subscriptionMode}
                goBack={goBack}
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ShadowBox>
                    <Field
                        ref={register}
                        label="Nombre"
                        id="name"
                        type="text"
                        placeholder="Juan Pérez"
                        required
                        autoComplete="fullName"
                    />
                </ShadowBox>
                <ShadowBox>
                    <Field
                        ref={register}
                        label="Empresa"
                        id="companyName"
                        type="text"
                        placeholder="Mi Empresa, S.L."
                        required
                        autoComplete="companyName"
                    />
                </ShadowBox>
                <ShadowBox>
                    <Field
                        ref={register}
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="juan@miempresa.es"
                        required
                        autoComplete="email"
                    />
                </ShadowBox>
                <ShadowBox>
                    <Field
                        ref={register}
                        label="Teléfono"
                        id="phone"
                        type="tel"
                        placeholder="678 912 345"
                        required
                        autoComplete="tel"
                    />
                </ShadowBox>
                <div
                    css={css`
                        margin-top: 20px;
                    `}
                >
                    <Button
                        style={waiting ? "dark" : "blue"}
                        type="submit"
                        base="button"
                        display="block"
                        extraStyles={css`
                            width: 100%;
                        `}
                    >
                        {waiting ? "Espere, por favor..." : "Comprar"}
                    </Button>
                    <Paragraph>
                        Para realizar el primer pago, será redirigido a Stripe
                    </Paragraph>
                    <div
                        css={css`
                            display: flex;
                            align-items: center;
                            font-size: 25px;
                            line-height: 25px;
                            color: #635bff;
                        `}
                    >
                        <a
                            href="https://stripe.com"
                            css={css`
                                display: block;
                                height: 30px;
                            `}
                        >
                            <img
                                src={stripeImage}
                                css={css`
                                    height: 30px;
                                `}
                                draggable="false"
                                alt="stripe"
                            />
                        </a>

                        <IoLockClosedOutline
                            css={css`
                                margin-left: 10px;
                            `}
                        />
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default CheckoutForm;
