import styled from "@emotion/styled";

export default styled.div<{ basis: string }>`
  flex-basis: ${(props) => props.basis};
`;
