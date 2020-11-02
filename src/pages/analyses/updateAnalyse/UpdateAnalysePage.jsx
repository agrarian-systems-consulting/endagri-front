import React from 'react';
import { Button, Form, Grid, Segment, Breadcrumb } from 'semantic-ui-react';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import UpdateAnalyseFormComponent from './UpdateAnalyseFormComponent';

const UpdateAnalysePage = () => {
  const { id } = useParams();

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
              <NavLink to={`/analyse/${id}`}>Analyse {id}</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Modifier les informations principales
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
              <UpdateAnalyseFormComponent />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UpdateAnalysePage;
