import React from 'react';
import { Button, Form, Grid, Segment, Breadcrumb } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const UpdateAnalysePage = () => {
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
              <h5>Modifier les informations principales d'une analyse</h5>
            </Segment>
            <Segment attached='bottom'>
              <Form>
                <Form.Field>
                  <label>Nom utilisateur</label>
                  <input placeholder='nom_utilisateur' />
                </Form.Field>
                <Form.Field>
                  <label>Nom client</label>
                  <input placeholder='nom_client' />
                </Form.Field>
                <Form.Field>
                  <label>Montant de trésorerie initiale</label>
                  <input placeholder='montant_tresorerie_initiale' />
                </Form.Field>
                <Form.Field>
                  <label>Date de début d'analyse</label>
                  <input placeholder='date_debut_analyse' />
                </Form.Field>
                <Form.Field>
                  <label>Date de fin d'analyse</label>
                  <input placeholder='date_fin_analyse' />
                </Form.Field>
                <Button type='submit' color='teal'>
                  Modifier l'analyse
                </Button>
              </Form>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UpdateAnalysePage;
