import styled from "@emotion/styled";

const FormRow = styled.div<{ noPadding?: boolean }>`
    display: flex;
    border: 1px solid #d7d3d3;
    box-shadow: 0px 2px 5px -2px rgba(122, 119, 152, 0.5);
    border-radius: 7px;
    margin: 10px 0;
    align-items: center;
    ${(props) => (props.noPadding ? "padding: 0;" : "padding: 10px 20px;")}
`;

export default FormRow;
