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
      <h1>Índices</h1>
      <Card>
        <h2>Índice de la calidad del aire (ICA)</h2>
        <Text>
          El ICA es un índice agregado que combina diferentes factores, como la
          concentración de CO<sub>2</sub>, VOC (compuestos orgánicos volátiles),
          para determinar la calidad del aire de una habitación. Para ello,
          empleamos referencias de la Agencia Europea del Medio Ambiente, así
          como parámetros de evaluación propia.
        </Text>
      </Card>
      <Card>
        <h2>
          Concentración de CO<sub>2</sub>
        </h2>
        <Text>
          La concentración de CO<sub>2</sub> es un factor importante para el
          rendimiento de un grupo de personas. Cuanto más saturado se encuentra
          el aire, más afectada se ve la capacidad de concentración y agilidad
          cognitiva.
        </Text>
      </Card>
      <Card>
        <h2>Concentración de VOC</h2>
        <Text>
          Los compuestos orgánicos volátiles (VOC) son compuestos orgánicos que
          se convierten fácilmente en vapores o gases. Junto con el carbono,
          contienen elementos como hidrógeno, oxígeno, flúor, cloro, bromo,
          azufre o nitrógeno. Los VOC son liberados por la quema de
          combustibles, como gasolina, madera, carbón o gas natural. También son
          liberados por disolventes, pinturas y otros productos empleados y
          almacenados en la casa y el lugar de trabajo.
        </Text>
        <Text>
          Muchos compuestos orgánicos volátiles son peligrosos contaminantes del
          aire. Pueden causar efeectos negativos para la salud, como fatiga,
          mareos o dolor de cabeza.
        </Text>
      </Card>
    </Main>
  );
};

export default Indices;
