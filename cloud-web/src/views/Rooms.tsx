/* eslint-disable indent */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import Card from "../components/Card";
import ListItem from "../components/ListItem";
import ListHeader from "../components/ListHeader";
import Main from "../components/Main";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import ListCell from "../components/ListCell";
import Footer from "../components/Footer";
import RoomDetail from "./RoomDetail";

import { gql, useQuery } from "@apollo/client";
import Header from "../components/Header";

export const GET_HOME_DATA = gql`
  query getProfile {
    myUser {
      profile {
        firstName
        lastName
        organisationName
        boards {
          id
          label
          serialNumber
          currentCO2: currentAverage(magnitude: CO2)
          currentR0: currentAverage(magnitude: R0)
        }
      }
    }
  }
`;

const Rooms = () => {
  const routeMatch = useRouteMatch();
  const { error, loading, data } = useQuery<{
    myUser: {
      profile: {
        firstName: string;
        lastName: string;
        organisationName: string;
        boards: {
          id: string;
          label: string;
          serialNumber: string;
          currentCO2: number;
          currentR0: number;
        }[];
      } | null;
    };
  }>(GET_HOME_DATA);
  const basePath = routeMatch.path;

  return (
    <Main>
      <Header />
      <div
        css={css`
          margin-top: 20px;
        `}
      >
        <span>{!loading && `${data?.myUser.profile?.organisationName}`}</span>{" "}
        &middot;{" "}
        <span>
          {!loading &&
            `${data?.myUser.profile?.firstName} ${data?.myUser.profile?.lastName}`}
        </span>
      </div>
      <Switch>
        <Route path={`${basePath}`} exact>
          <h1>Dispositivos</h1>
          <ListHeader>
            <ListCell basis="50%">Dispositivo</ListCell>
            <ListCell basis="25%">
              CO<sub>2</sub>
            </ListCell>
            <ListCell basis="25%">
              R<sub>0</sub>
            </ListCell>
          </ListHeader>
          {loading
            ? "Loading"
            : data?.myUser.profile?.boards.map((board) => (
                <ListItem link={`${basePath}${board.id}`} key={board.id}>
                  <ListCell basis="50%">
                    Nébula {board.label} {board.serialNumber}
                  </ListCell>
                  <ListCell basis="25%">
                    {Math.trunc(board.currentCO2)} ppm
                  </ListCell>
                  <ListCell basis="25%">{board.currentR0.toFixed(2)}</ListCell>
                </ListItem>
              ))}
        </Route>
        <Route path={`${basePath}:id`}>
          <RoomDetail />
        </Route>
      </Switch>
      <div
        css={css`
          text-align: center;
        `}
      >
        <Footer fontColor="#888888" />
      </div>
    </Main>
  );
};

export default Rooms;
