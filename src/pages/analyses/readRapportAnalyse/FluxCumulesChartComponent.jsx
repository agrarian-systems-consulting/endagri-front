import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
} from 'recharts';

const FluxCumulesChartComponent = ({ data }) => {
  const chartData = data;

  return (
    <ResponsiveContainer width='100%' height={500}>
      <ComposedChart
        barCategoryGap={10}
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='mois' angle={-45} textAnchor='end' height={70} />
        <YAxis
          yAxisId='left'
          label={{
            value: 'Trésorerie',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip />
        <Legend />

        <Line
          yAxisId='left'
          ype='monotone'
          dataKey='solde_cumule'
          stroke='#97E3D4'
          strokeWidth={3}
          name='Trésorerie'
        />
      </ComposedChart>
      {/* <pre>{JSON.stringify(chartData, true, 2)}</pre> */}
    </ResponsiveContainer>
  );
};

export default FluxCumulesChartComponent;
