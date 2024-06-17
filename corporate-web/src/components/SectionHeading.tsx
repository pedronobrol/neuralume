import styled from "@emotion/styled";

const SectionHeading = styled.h2`
    font-weight: 500;
    font-size: 36pt;

    @media (max-width: 900px) {
        font-size: 24pt;
        line-height: 28pt;
    }
    @media (max-width: 450px) {
        font-size: 20pt;
        line-height: 24pt;
    }
`;

export default SectionHeading;
