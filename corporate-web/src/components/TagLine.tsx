import styled from "@emotion/styled";
import Paragraph from "./Paragraph";

const TagLine = styled(Paragraph)`
    font-size: 18pt;
    line-height: 22pt;
    @media (max-width: 900px) {
        font-size: 15pt;
        line-height: 20pt;
    }
`;

export default TagLine;
