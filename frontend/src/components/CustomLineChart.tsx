// // CustomLineChart.jsx
// import React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';

// const CustomLineChart = ({ data }) => {
//   return (
//     <LineChart
//         xAxis={[{ data: data.xAxis }]}
//         series={[
//         {
//             data: data.yAxis,
//         },
//         ]}
//         width={500}
//         height={300}
//     />
//   );
// };

// export default CustomLineChart;

// LineChart.js;
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomLineChart = ({ data }) => (
  <LineChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="code" stroke="#8884d8" />
  </LineChart>
);

export default CustomLineChart;
