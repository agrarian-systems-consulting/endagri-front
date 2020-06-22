import React from 'react';
import { Button, Form, Grid, Segment, Breadcrumb } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

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
              <Form>
                <Form.Field>
                  <label>Production</label>
                  <input placeholder='id_production' />
                </Form.Field>
                <Form.Field>
                  <label>Libellé</label>
                  <input placeholder='libelle' />
                </Form.Field>
                <Form.Field>
                  <label>Période de démarrage possible - Début</label>
                  <input placeholder='ini_debut' />
                </Form.Field>
                <Form.Field>
                  <label>Période de démarrage possible - Fin</label>
                  <input placeholder='ini_fin' />
                </Form.Field>
                <Form.Field>
                  <label>Commentaire</label>
                  <input placeholder='commentaire' />
                </Form.Field>
                <Button as={NavLink} to='/fiches'>
                  Annuler
                </Button>
                <Button type='submit' color='teal'>
                  Créer la nouvelle fiche
                </Button>
              </Form>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateFichePage;
