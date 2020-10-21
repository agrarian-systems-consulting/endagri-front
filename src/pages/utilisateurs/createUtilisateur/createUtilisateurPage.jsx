import React from 'react';
import { Grid, Breadcrumb, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import CreateUtilisateurFormComponent from './CreateUtilisateurFormComponent';

const CreateUtilisateurPage = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/utilisateurs'>Utilisateurs</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Créer un nouvel utilisateur
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Créer un nouvel utilisateur</h5>
            </Segment>
            <Segment attached='bottom'>
              <CreateUtilisateurFormComponent />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateUtilisateurPage;
