import React, { Fragment, useState } from 'react';
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
import { Loader } from 'semantic-ui-react';

const FluxMensuelsChartComponent = ({ data }) => {
  // Créer un tableau des dépenses en valeurs négatives // Attention : ici on mutate directement le state, on pourrait faire mieux.
  const chartData = (donnees) => {
    let chart_data = donnees;
    chart_data.map((d) => (d.total_depenses_neg = d.total_depenses * -1));

    return chart_data;
  };

  return (
    <Fragment>
      <ResponsiveContainer width='100%' height={500}>
        <ComposedChart
          barCategoryGap={1}
          data={chartData(data)}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          `
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='mois' angle={-45} textAnchor='end' height={70} />
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
            dataKey='total_depenses_neg'
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
      </ResponsiveContainer>

      {/* <pre>{JSON.stringify(data, true, 2)}</pre> */}
    </Fragment>
  );
};

export default FluxMensuelsChartComponent;
