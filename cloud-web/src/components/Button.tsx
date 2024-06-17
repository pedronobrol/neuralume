/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import styled from "@emotion/styled";
import * as React from "react";
import ShadowBox from "./ShadowBox";

const ButtonBase = styled.button`
  margin: 0;
  height: 45px;
  box-sizing: border-box;
  background-color: rgb(246, 131, 129);
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 14pt;
  font-family: "IBM Plex Sans";
  padding: 10px 20px;

  &:hover {
    cursor: pointer;
  }
`;

const InputField: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <ShadowBox
      css={css`
        display: inline-block;
      `}
    >
      <ButtonBase {...props} />
    </ShadowBox>
  );
};

export default InputField;
