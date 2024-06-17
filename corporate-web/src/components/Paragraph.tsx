import styled from "@emotion/styled";

const Paragraph = styled.p<{ narrow?: boolean }>`
    width: 100%;
    font-size: 14pt;
    line-height: 22pt;
    ${(props) =>
        props.narrow
            ? "max-width: 800px; margin-left: auto; margin-right: auto;"
            : "max-width: 800px;"}

    @media (max-width: 900px) {
        font-size: 12.5pt;
        line-height: 18pt;
    }
`;

export default Paragraph;
