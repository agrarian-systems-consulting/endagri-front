import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, Grid, Segment } from 'semantic-ui-react';
import FicheFormComponent from './FicheFormComponent';

const CreateFichePage = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/fiches'>Fiches</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Créer une nouvelle fiche
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Créer une nouvelle fiche</h5>
            </Segment>
            <Segment attached='bottom'>
              <FicheFormComponent />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateFichePage;
