/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import styled from "@emotion/styled";
import ShadowBox from "./ShadowBox";

export const InputBase = styled.input`
  display: block;
  position: relative;
  font-family: "IBM Plex Sans";
  font-size: 14pt;
  height: 50px;
  width: 250px;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: white;
  border: 1px #cecece solid;
  appearance: none;
  box-sizing: border-box;
  outline: none;
`;

const InputField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <ShadowBox
    css={css`
      margin-bottom: 15px;
    `}
  >
    <InputBase {...props} ref={ref} />
  </ShadowBox>
));

export default InputField;
