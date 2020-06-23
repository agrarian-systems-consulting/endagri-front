import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

const GrapheComponent = () => {
  return (
    <Grid.Column width={10}>
      <Segment.Group>
        <Segment>
          <h5>Graphe</h5>
        </Segment>
        <Segment>Créer le graphe des flux de trésorerie sortants</Segment>
      </Segment.Group>
    </Grid.Column>
  );
};

export default GrapheComponent;
