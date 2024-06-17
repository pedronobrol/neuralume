/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { Link } from "react-router-dom";
import { css, jsx } from "@emotion/react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 3px 10px -3px rgba(200, 200, 200, 0.5);
  border-radius: 7px;
  padding: 17px 20px;
  margin-bottom: 17px;
  transition: background-color 150ms ease-in-out;
  border: 1px solid #eee5ed;

  &:hover {
    background-color: #f3f1f5;
  }
`;

const ListItem: React.FC<{ link: string }> = ({ children, link }) => {
  return (
    <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
      <Container>{children}</Container>
    </Link>
  );
};

export default ListItem;
