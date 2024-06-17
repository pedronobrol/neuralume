/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import {
    StripeCardElementChangeEvent,
    StripeCardElementOptions,
    StripeElementChangeEvent,
} from "@stripe/stripe-js";
import {
    CardElement,
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
} from "@stripe/react-stripe-js";
import FormRow from "./FormRow";

const CARD_OPTIONS: StripeCardElementOptions = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#405996",
            color: "#000000",
            fontFamily: `"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
          "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif`,
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#b19a25",
            },
            "::placeholder": {
                color: "#969ca5",
            },
        },
        invalid: {
            iconColor: "#f68382",
            color: "#f68382",
        },
    },
};

const CardField: React.FC<{
    onChange: (event: StripeElementChangeEvent) => any;
}> = ({ onChange }) => (
    <div>
        <FormRow
            noPadding
            css={css`
                display: block;
            `}
        >
            <div>
                <CardElement options={CARD_OPTIONS} onChange={onChange} />
            </div>
            <div
                css={css`
                    display: flex;
                `}
            >
                {/* <CardExpiryElement options={CARD_OPTIONS} onChange={onChange} />
                <CardCvcElement options={CARD_OPTIONS} onChange={onChange} /> */}
            </div>
        </FormRow>
    </div>
);

export default CardField;
