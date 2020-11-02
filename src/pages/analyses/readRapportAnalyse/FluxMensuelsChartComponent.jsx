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

const FluxMensuelsChartComponent = ({ data }) => {
  const chartData = data;
  data.map((d) => (d.total_depenses = d.total_depenses * -1));

  return (
    <ResponsiveContainer width='100%' height={500}>
      <ComposedChart
        barCategoryGap={1}
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
      </ComposedChart>
      {/* <pre>{JSON.stringify(chartData, true, 2)}</pre> */}
    </ResponsiveContainer>
  );
};

export default FluxMensuelsChartComponent;
