import React from "react";
import moment from "moment";

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TimeSeriesChart: React.FC<{
  chartData: { time: number; value: number }[];
}> = ({ chartData }) => (
  <ResponsiveContainer width="95%" height={350}>
    <ScatterChart>
      <XAxis
        dataKey="time"
        domain={["auto", "auto"]}
        name="Fecha"
        tickFormatter={(unixTime) =>
          moment
            .utc(unixTime * 1000)
            .local()
            .format("HH:mm DD/MM")
        }
        type="number"
      />
      <YAxis dataKey="value" name="Valor" />
      <Tooltip
        formatter={(value: any, name: any, props: any) => {
          if (props.dataKey === "value") return value;
          return moment
            .utc(value * 1000)
            .local()
            .format("HH:mm DD/MM");
        }}
      />

      <Scatter
        data={chartData}
        line={{ stroke: "#a4a4a4" }}
        lineJointType="monotoneX"
        lineType="joint"
        name="Values"
      />
    </ScatterChart>
  </ResponsiveContainer>
);

export default TimeSeriesChart;
