/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import {
    ProductConfigOption,
    ProductConfigOptionProps,
} from "./ProductConfiguration";

export type ProductSubscriptionPlanProps = ProductConfigOptionProps & {
    pricePerMonth: number;
    planTitle: string;
    billingSummary?: string;
    saving?: string;
    featured?: string;
};

const PlanTitle = styled.div`
    font-size: 14pt;
`;

const BillingSummary = styled.div`
    font-size: 11pt;
    color: #5c5c5c;
    margin-top: 8px;
    font-style: italic;
`;

const PricePerMonth = styled.div`
    font-size: 14pt;
    font-weight: 500;
`;

const Saving = styled.div`
    font-size: 11pt;
    margin-top: 2px;
    padding: 3px 6px;
    background-color: #d7f7f0;
    color: #2e7461;
    font-weight: 500;
    border-radius: 7px;
`;

const ProductSubscriptionPlan: React.FC<ProductSubscriptionPlanProps> = ({
    pricePerMonth,
    planTitle,
    billingSummary,
    saving,
    featured,
    active,
    onClick,
}) => {
    return (
        <ProductConfigOption active={active} onClick={onClick}>
            <div
                css={css`
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                `}
            >
                <div>
                    <PlanTitle>{planTitle}</PlanTitle>
                    {billingSummary && (
                        <BillingSummary>{billingSummary}</BillingSummary>
                    )}
                </div>
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                    `}
                >
                    <PricePerMonth>
                        {pricePerMonth} &euro;{" "}
                        <span
                            css={css`
                                color: #727272;
                            `}
                        >
                            /mes
                        </span>
                    </PricePerMonth>
                    {saving && <Saving>{saving}</Saving>}
                </div>
            </div>
        </ProductConfigOption>
    );
};

export default ProductSubscriptionPlan;
