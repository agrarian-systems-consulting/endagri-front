import React from 'react';
import { Grid, Segment, Button, Breadcrumb } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const DeleteAnalysePage = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/analyses'>Analyses</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section>
              <NavLink to='/analyse/1'>Analyse 1</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Supprimer</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Supprimer une analyse</h5>
            </Segment>
            <Segment attached='bottom'>
              <p>
                Cette action est irréversible, l'analyse sera supprimée de façon
                définitive.
              </p>
              <Button color='red'>Supprimer</Button>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DeleteAnalysePage;
