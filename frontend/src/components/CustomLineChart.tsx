// CustomLineChart.jsx
import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const CustomLineChart = ({ data }) => {
  return (
    <LineChart
        xAxis={[{ data: data.xAxis }]}
        series={[
        {
            data: data.yAxis,
        },
        ]}
        width={500}
        height={300}
    />
  );
};

export default CustomLineChart;
