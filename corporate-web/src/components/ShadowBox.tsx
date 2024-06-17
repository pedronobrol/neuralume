import styled from "@emotion/styled";

const ShadowBox = styled.div`
    position: relative;
    &:after {
        content: "";
        border-radius: 6px;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0;
        top: 0;
        left: 0;
        box-shadow: 0px 3px 15px -4px rgba(0, 0, 0, 0.3);
        transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    &:focus-within:after {
        opacity: 1;
    }
`;

export default ShadowBox;
