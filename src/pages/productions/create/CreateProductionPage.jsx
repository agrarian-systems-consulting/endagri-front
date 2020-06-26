import React from 'react';
import { Grid, Breadcrumb, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ProductionFormComponent from './ProductionFormComponent';

const CreateProductionPage = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/productions'>Productions</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Créer une nouvelle production
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Créer une nouvelle production</h5>
            </Segment>
            <Segment attached='bottom'>
              <ProductionFormComponent />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateProductionPage;
