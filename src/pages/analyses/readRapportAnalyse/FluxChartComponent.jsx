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

const FluxChartComponent = ({ data }) => {
  const chartData = data;
  data.map((d) => (d.total_depenses = d.total_depenses * -1));

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
        <XAxis dataKey='mois' />
        <YAxis
          yAxisId='left'
          label={{
            value: 'Ventes et Dépenses',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <YAxis
          yAxisId='right'
          orientation='right'
          label={{
            value: 'Trésorerie',
            angle: 90,
            position: 'insideRight',
          }}
        />
        <Tooltip />
        <Legend />

        <Bar
          yAxisId='left'
          dataKey='total_depenses'
          fill='#F47560'
          name='Dépenses'
        />
        <Bar
          yAxisId='left'
          dataKey='total_ventes'
          fill='#F1E059'
          name='Ventes'
        />
        <Line
          yAxisId='right'
          ype='monotone'
          dataKey='solde_cumule'
          stroke='#97E3D4'
          strokeWidth={2}
          name='Solde cumulé'
        />
      </ComposedChart>
      {/* <pre>{JSON.stringify(chartData, true, 2)}</pre> */}
    </ResponsiveContainer>
  );
};

export default FluxChartComponent;
