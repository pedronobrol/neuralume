import * as React from "react";
import Card from "../components/Card";
import ListItem from "../components/ListItem";
import ListHeader from "../components/ListHeader";
import Main from "../components/Main";
import { Route, Switch } from "react-router-dom";
import Text from "../components/Text";

const Indices = () => {
  return (
    <Main>
      <h1>Alertas</h1>
      <Text> ¡Estupendo!, no tienes ninguna alerta.</Text>
    </Main>
  );
};

export default Indices;
