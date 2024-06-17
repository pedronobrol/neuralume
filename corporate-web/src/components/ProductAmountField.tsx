/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import Anchor from "./Anchor";

export type ProductAmountFieldProps = {
    value: string;
    setValue: (value: string) => void;
    hasOffer?: boolean;
    editable: boolean;
};

const Input = styled.input`
    border-radius: 7px;
    border: 2px #c6cdd0 solid;
    padding: 10px 10px;
    font-family: inherit;
    font-size: 16pt;
    transition: all 200ms ease-out;
    outline: none;
    text-align: center;
    margin: 0 10px;
    height: 50px;
    width: 70px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:focus {
        border-color: #7faee8;
    }

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    & {
        -moz-appearance: textfield;
    }
`;

const Button = styled.button`
    font-size: 16pt;
    width: 50px;
    background-color: #e8edf0;
    border: none;
    text-align: center;
    line-height: 16pt;
    height: 50px;
    box-sizing: border-box;
    border-radius: 7px;
    outline: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:active {
        background-color: #9fabb0;
    }
`;

const ErrContainer = styled.small`
    color: #e33636;
    display: block;
    font-size: 11pt;
    margin-top: 10px;
`;

const ProductAmountField = React.forwardRef<
    HTMLInputElement,
    ProductAmountFieldProps
>(({ value, setValue, hasOffer, editable }, ref) => {
    const [error, setError] = React.useState<string | null>(null);

    const addAmount = () => {
        setError(null);
        const amountInt = parseInt(value);
        setValue(amountInt >= 1 ? `${amountInt + 1}` : "1");
    };

    const removeAmount = () => {
        setError(null);
        const amountInt = parseInt(value);
        setValue(amountInt > 1 ? `${amountInt - 1}` : "1");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        const newValueInt = parseInt(newValue);
        if ((newValueInt <= 0 || !/^\d+$/.test(newValue)) && error === null)
            setError("Por favor, introduzca un número válido de unidades.");
        else if (newValueInt >= 1 && error !== null) setError(null);
        setValue(newValue);
    };

    return (
        <div>
            <div
                css={css`
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                `}
            >
                {editable && (
                    <Button onClick={addAmount}>
                        <IoAddOutline />
                    </Button>
                )}
                <div
                    css={css`
                        font-size: 16pt;
                    `}
                >
                    {!editable && (
                        <span
                            css={css`
                                color: #333;
                            `}
                        >
                            Unidades:{" "}
                        </span>
                    )}
                    <Input
                        type="number"
                        ref={ref}
                        name="amount"
                        value={value}
                        onChange={handleChange}
                        readOnly={!editable}
                        css={css`
                            ${!editable &&
                            css`
                                margin: 0;
                                border-radius: 0;
                                font-weight: 500;
                                border: none;
                                padding-left: 0;
                                text-align: left;
                            `}
                        `}
                    />
                </div>
                {editable && (
                    <Button onClick={removeAmount}>
                        <IoRemoveOutline />
                    </Button>
                )}
            </div>
            {error && <ErrContainer>{error}</ErrContainer>}
            {!error && parseInt(value) >= 10 && !hasOffer && (
                <div
                    css={css`
                        margin-top: 10px;
                        line-height: 150%;
                    `}
                >
                    Para pedidos de 10 o más unidades, puede contactar con
                    nuestro equipo de ventas para un presupuesto personalizado
                    en:{" "}
                    <Anchor extern link="tel:0034981783670">
                        (+34) 981 78 36 70
                    </Anchor>{" "}
                    (lunes a viernes, de 12pm a 6pm) o envíe un correo a{" "}
                    <Anchor extern link="mailto:contact@neuralume.com">
                        contact@neuralume.com
                    </Anchor>
                    .
                </div>
            )}
        </div>
    );
});

export default ProductAmountField;
