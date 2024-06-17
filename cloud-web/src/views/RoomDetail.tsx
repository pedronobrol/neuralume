/* eslint-disable indent */
/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouteMatch } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import TimeSeriesChart from "../components/TimeSeriesChart";
import moment from "moment";
import { ReactComponent as ThermometerIcon } from "../images/thermometer-outline.svg";
import { ReactComponent as WaterIcon } from "../images/water-outline.svg";
import { InputBase } from "../components/InputField";
import ShadowBox from "../components/ShadowBox";
import Button from "../components/Button";
import { useForm } from "react-hook-form";

const GET_BOARD = gql`
  query getBoard($id: ID!) {
    board(id: $id) {
      label
      serialNumber
      historicData(magnitude: CO2, numPoints: 20, timeInterval: 480) {
        value: data
        time: measuredAt
      }
      currentCO2: currentAverage(magnitude: CO2)
      currentHumidity: currentAverage(magnitude: RH)
      currentTemperature: currentAverage(magnitude: T)
      currentRisk: currentAverage(magnitude: R0)
      width
      height
      length
      occupation
      sampleInterval
      postInterval
      deviceModel
    }
  }
`;

const LOW_RISK_THRESHOLD = 1;
const MEDIUM_RISK_THRESHOLD = 1.5;

function getRiskRecommendation(
  risk: number | undefined
): "low" | "medium" | "high" | undefined {
  if (risk === undefined) return undefined;
  if (risk < LOW_RISK_THRESHOLD) return "low";
  if (risk < MEDIUM_RISK_THRESHOLD) return "medium";
  return "high";
}

const riskLabels = {
  low: {
    label: "Bajo",
    recommendation: "El ambiente es seguro.",
    color: "#41a95f",
  },
  medium: {
    label: "Medio",
    recommendation: "Es recomendable ventilar la estancia.",
    color: "#dea248",
  },
  high: {
    label: "Alto",
    recommendation: "Es urgente ventilar la estancia.",
    color: "#de5748",
  },
};

// function parseDate(date: string) {
//   const dateObj = new Date(date);
//   const h = dateObj.getHours();
//   const m = dateObj.getMinutes();
//   return `${h}:${m}`;
// }

const Card = styled.div`
  margin: 0 5px;

  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
  width: 100%;
  border: 1px solid #aba2a2;
  padding: 10px;
  box-sizing: border-box;

  box-shadow: 0 3px 10px -3px rgba(200, 200, 200, 0.5);
  border-radius: 7px;
  transition: background-color 150ms ease-in-out;
  border: 1px solid #eee5ed;

  @media screen and (max-width: 750px) {
    margin: 0;
    margin-bottom: 10px;
  }
`;

const CardTitle = styled.div`
  font-size: 20px;
  height: 35px;
  font-weight: 500;
`;

const CardValue = styled.div`
  font-weight: 400;
  font-size: 27px;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
`;

const SettingsLabel = styled.div`
  flex-basis: 200px;
`;

const InputField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <InputBase
    {...props}
    ref={ref}
    css={css`
      margin: 7px 0;
      ${props.disabled && "border-color: white;"}
    `}
  />
));

const SectionSeparator = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const RoomDetail: React.FC = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const [isEditingBoard, setIsEditingBoard] = React.useState<boolean>(false);

  const { error, loading, data } = useQuery<
    {
      board: {
        label: string;
        serialNumber: string;
        historicData: { value: number; time: string }[];
        currentCO2: number;
        currentHumidity: number;
        currentTemperature: number;
        currentRisk: number;
        width: number;
        height: number;
        length: number;
        occupation: number;
        deviceModel: string;
        postInterval: number;
        sampleInterval: number;
      };
    },
    { id: string }
  >(GET_BOARD, { variables: { id: params.id } });
  const { width, height, length, occupation, label } = data?.board || {};
  const { register, handleSubmit, setValue } = useForm();
  React.useEffect(() => {
    setValue("width", width);
    setValue("length", length);
    setValue("height", height);
    setValue("occupation", occupation);
    setValue("label", label);
  }, [width, length, height, occupation, label]);
  if (error) return <div>{error}</div>;
  if (loading) return <div>Cargando... Por favor, espere.</div>;

  const riskRecommendation = getRiskRecommendation(data?.board.currentRisk);
  return (
    <div>
      <h1>
        Nébula {data?.board.label} {data?.board.serialNumber}
      </h1>
      <div
        css={css`
          margin-bottom: 30px;
        `}
      >
        <div
          css={css`
            display: flex;

            @media screen and (max-width: 750px) {
              display: block;
            }
          `}
        >
          <Card>
            <CardTitle>CO2</CardTitle>
            <CardValue>{data?.board.currentCO2} ppm</CardValue>
          </Card>
          <Card>
            <CardTitle>
              <ThermometerIcon
                css={css`
                  height: 26px;
                `}
              />
            </CardTitle>
            <CardValue>{data?.board.currentTemperature}ºC</CardValue>
          </Card>
          <Card>
            <CardTitle>
              <WaterIcon
                css={css`
                  height: 26px;
                `}
              />
            </CardTitle>
            <CardValue>{data?.board.currentHumidity}%</CardValue>
          </Card>
        </div>
        <Card
          css={css`
            margin: 10px 0;
          `}
        >
          <div
            css={css`
              display: flex;
              @media screen and (max-width: 750px) {
                display: block;
              }
            `}
          >
            <div
              css={css`
                flex-basis: 31%;
              `}
            >
              <CardTitle>Riesgo de contagio</CardTitle>
              <CardValue>
                <span
                  css={css`
                    color: ${riskRecommendation
                      ? riskLabels[riskRecommendation].color
                      : "black"};
                  `}
                >
                  {riskRecommendation && riskLabels[riskRecommendation].label}
                </span>
              </CardValue>
            </div>
            <div
              css={css`
                box-sizing: border-box;
                position: relative;
                border-left: solid 1px #cbc1ca;
                margin: 5px 10px;
                width: 0px;
                @media screen and (max-width: 750px) {
                  display: none;
                }
              `}
            />
            <div
              css={css`
                flex-basis: 69%;
                @media screen and (max-width: 750px) {
                  margin-top: 15px;
                }
              `}
            >
              R0 estimada: {data?.board.currentRisk.toFixed(2)}
              <br />
              <span
                css={css`
                  font-weight: 500;
                `}
              >
                {riskRecommendation &&
                  riskLabels[riskRecommendation].recommendation}
              </span>
            </div>
          </div>
        </Card>
      </div>
      <p>
        Datos de CO<sub>2</sub> de las últimas 8 horas, en ppm (partes por
        millón).
      </p>
      <TimeSeriesChart
        chartData={
          data?.board.historicData
            .slice()
            .reverse()
            .map((obj) => ({ ...obj, time: moment(obj.time).unix() })) || []
        }
      />
      <div>
        <div
          css={css`
            display: flex;
            align-items: center;
            @media screen and (max-width: 600px) {
              display: block;
            }
          `}
        >
          <h2
            css={css`
              margin-right: 20px;
              @media screen and (max-width: 600px) {
                margin-right: 0;
                margin-bottom: 10px;
              }
            `}
          >
            Configuración
          </h2>
          <div
            css={css`
              @media screen and (max-width: 600px) {
                margin-bottom: 10px;
              }
            `}
          >
            <Button
              css={css`
                background-color: ${isEditingBoard ? "#e9656e" : "#192a4f"};
                height: 35px;
                padding: 5px 10px;
                font-size: 12pt;
              `}
              onClick={() => setIsEditingBoard(!isEditingBoard)}
            >
              {isEditingBoard ? "Cancelar" : "Editar"}
            </Button>
            {isEditingBoard && (
              <span
                css={css`
                  margin-left: 10px;
                `}
              >
                <Button
                  css={css`
                    background-color: #49937b;

                    height: 35px;
                    padding: 5px 10px;
                    font-size: 12pt;
                  `}
                  onClick={() => setIsEditingBoard(!isEditingBoard)}
                >
                  Guardar
                </Button>
              </span>
            )}
          </div>
        </div>

        <form>
          <TableRow>
            <SettingsLabel>Nombre identificativo</SettingsLabel>
            <InputField
              disabled={!isEditingBoard}
              type="text"
              name="label"
              ref={register}
            />
          </TableRow>
          <SectionSeparator>Características de la estancia</SectionSeparator>
          <TableRow>
            <SettingsLabel>Ancho estancia (metros)</SettingsLabel>
            <InputField
              disabled={!isEditingBoard}
              type="text"
              name="width"
              ref={register}
            />
          </TableRow>

          <TableRow>
            <SettingsLabel>Alto estancia (metros)</SettingsLabel>
            <InputField
              disabled={!isEditingBoard}
              type="text"
              name="height"
              ref={register}
            />
          </TableRow>
          <TableRow>
            <SettingsLabel>Largo estancia (metros)</SettingsLabel>
            <InputField
              disabled={!isEditingBoard}
              type="text"
              name="length"
              ref={register}
            />
          </TableRow>
          <TableRow>
            <SettingsLabel>Aforo máximo (personas)</SettingsLabel>
            <InputField
              disabled={!isEditingBoard}
              type="text"
              name="occupation"
              ref={register}
            />
          </TableRow>
          <SectionSeparator>Propiedades del dispositivo</SectionSeparator>
          <TableRow>
            <SettingsLabel>Número de serial</SettingsLabel>
            <InputField disabled type="text" value={data?.board.serialNumber} />
          </TableRow>
          <TableRow>
            <SettingsLabel>Modelo</SettingsLabel>
            <InputField disabled type="text" value={data?.board.deviceModel} />
          </TableRow>
          <TableRow>
            <SettingsLabel>Frecuencia de muestreo (segundos)</SettingsLabel>
            <InputField
              disabled
              type="text"
              name="postInterval"
              value={
                data?.board.postInterval && data?.board.postInterval / 1000
              }
            />
          </TableRow>
        </form>
      </div>
    </div>
  );
};

export default RoomDetail;
