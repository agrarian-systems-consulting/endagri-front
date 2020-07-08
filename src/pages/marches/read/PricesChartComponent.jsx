import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from 'recharts';
import { Segment } from 'semantic-ui-react';

const PricesChartComponent = ({ marche }) => {
  // TODO : Make it dynamic to have a clear view at all times
  const BAR_GAP = 4;
  const BAR_SIZE = 20;

  const chartData = [
    { name: 'J', prix: marche.prix_january || 0 },
    { name: 'F', prix: marche.prix_february || 0 },
    { name: 'M', prix: marche.prix_march || 0 },
    { name: 'A', prix: marche.prix_april || 0 },
    { name: 'M', prix: marche.prix_may || 0 },
    { name: 'J', prix: marche.prix_june || 0 },
    { name: 'J', prix: marche.prix_july || 0 },
    { name: 'A', prix: marche.prix_august || 0 },
    { name: 'S', prix: marche.prix_september || 0 },
    { name: 'O', prix: marche.prix_october || 0 },
    { name: 'N', prix: marche.prix_november || 0 },
    { name: 'D', prix: marche.prix_december || 0 },
  ];

  return (
    <Segment.Group>
      <Segment attached='top'>
        <h5>Graphe des prix</h5>
      </Segment>
      <Segment attached='bottom'>
        <ResponsiveContainer width='100%' height={400}>
          <BarChart
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
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey='prix' fill='#97E3D4' name='Prix' />
          </BarChart>
        </ResponsiveContainer>
      </Segment>
    </Segment.Group>
  );
};

export default PricesChartComponent;
