/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Card from "../components/Card";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Page from "../components/Page";
import CardTitle from "../components/CardTitle";
import Text from "../components/Text";

const data1 = [
  { name: "Group A", value: 50 },
  { name: "Group B", value: 30 },
  { name: "Group C", value: 20 },
];

const data2 = [
  {
    name: "10/11",
    co2: 450,
    voc: 10,
  },
  {
    name: "11/11",
    co2: 600,
    voc: 30,
  },
  {
    name: "12/11",
    co2: 750,
    voc: 2,
  },
  {
    name: "13/11",
    co2: 440,
    voc: 20,
  },
  {
    name: "14/11",
    co2: 500,
    voc: 24,
  },
  {
    name: "15/11",
    co2: 650,
    voc: 45,
  },
  {
    name: "16/11",
    co2: 450,
    voc: 20,
  },
];

const COLORS = ["#00C49F", "#ffc517", "#f75754"];

interface LegendItemProps {
  color: string;
  backgroundColor: string;
}

const LegendItem: React.FC<LegendItemProps> = ({
  color,
  backgroundColor,
  children,
}) => {
  const legendItemStyles = css`
    margin: 20px 0;
    font-size: 16pt;
    border-radius: 5px;
    padding: 5px 10px;
    text-align: center;
    color: ${color};
    background-color: ${backgroundColor};
  `;
  return <li css={legendItemStyles}>{children}</li>;
};

const LegendList = styled.ul`
  list-style: none;
`;

const Dashboard: React.FC = () => {
  return (
    <Page pageTitle="Dashboard">
      <Card>
        <CardTitle>Nivel de calidad de aire (últimos 15 días)</CardTitle>
        <Text>
          Porcentaje de habitaciones según el nivel medio de ventilación y
          calidad del aire en los últimos 15 días
        </Text>
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <PieChart width={180} height={180}>
            <Pie
              data={data1}
              cx={90}
              cy={90}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data1.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div>
            <LegendList>
              <LegendItem color="#0b6857" backgroundColor="#80e4d2">
                {data1[0].value}% Alto
              </LegendItem>
              <LegendItem color="#725b17" backgroundColor="#ffe494">
                {data1[1].value}% Medio
              </LegendItem>
              <LegendItem color="#a72f49" backgroundColor="#f19d9c">
                {data1[2].value}% Bajo
              </LegendItem>
            </LegendList>
          </div>
        </div>
      </Card>
      <Card>
        <h2 style={{ marginTop: "0" }}>
          Concentración media de CO<sub>2</sub> y COV (últimos 15 días)
        </h2>
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <BarChart
            width={450}
            height={300}
            data={data2}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={false} />
            <Bar dataKey="voc" fill="#eed5da" radius={[7, 7, 0, 0]} />
          </BarChart>
          <BarChart
            width={450}
            height={300}
            data={data2}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={false} />
            <Bar dataKey="co2" fill="#d6d8f0" radius={[7, 7, 0, 0]} />
          </BarChart>
        </div>
      </Card>
    </Page>
  );
};

export default Dashboard;
