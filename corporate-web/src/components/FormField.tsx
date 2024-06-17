/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import FormRow from "./FormRow";
import FormRowLabel from "./FormRowLabel";
import FormRowInput from "./FormRowInput";

export type FormFieldProps = {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    autoComplete: string;
};

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, id, type, placeholder, required, autoComplete }, ref) => (
        <FormRow>
            <FormRowLabel htmlFor={id}>{label}</FormRowLabel>
            <FormRowInput
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                ref={ref}
            />
        </FormRow>
    )
);

export default FormField;
