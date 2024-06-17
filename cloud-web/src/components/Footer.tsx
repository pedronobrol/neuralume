/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";

export type FooterProps = {
  fontColor?: string;
};

const Footer: React.FC<FooterProps> = ({ fontColor }) => {
  return (
    <div
      css={css`
        color: ${fontColor || "white"};
      `}
    >
      <small>&copy; 2020 Neuralume Labs Ltd</small>
    </div>
  );
};

export default Footer;
