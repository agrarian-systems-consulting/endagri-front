import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, Grid, Segment } from 'semantic-ui-react';
import MarcheFormComponent from './MarcheFormComponent';

const CreateMarchePage = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/fiches'>Marché</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Créer un nouveau marché
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Créer un nouveau marché</h5>
            </Segment>
            <Segment attached='bottom'>
              <MarcheFormComponent />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateMarchePage;
