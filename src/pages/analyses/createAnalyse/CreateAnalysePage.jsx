import React from 'react';
import { Button, Form, Grid, Segment, Breadcrumb } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import AnalyseFormComponent from './AnalyseFormComponent';

const CreateAnalysePage = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/analyses'>Analyses</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Créer une nouvelle analyse
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Créer une nouvelle analyse</h5>
            </Segment>
            <Segment attached='bottom'>
              <AnalyseFormComponent />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateAnalysePage;
