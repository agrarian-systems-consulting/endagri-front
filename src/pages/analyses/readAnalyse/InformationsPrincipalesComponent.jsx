import React from 'react';
import { Grid, Segment, Header, List, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const InformationsPrincipalesComponent = ({ info }) => {
  return (
    <Grid.Row>
      <Grid.Column width={10}>
        <Segment.Group>
          <Segment attached='top' color='violet'>
            <Header as='h4'>Informations principales</Header>
          </Segment>
          <Segment attached>
            <List>
              <List.Item>Client : {info.nom_client}</List.Item>
              <List.Item>
                Trésorerie initiale : {info.montant_tresorerie_initiale}
              </List.Item>
              <List.Item>Début analyse : {info.date_debut_analyse}</List.Item>
              <List.Item>Fin analyse : {info.date_fin_analyse}</List.Item>
            </List>
            <Button as={NavLink} to={`/analyse/1/update`}>
              Modifier
            </Button>
          </Segment>
        </Segment.Group>
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment.Group>
          <Segment color='violet'>
            <Header as='h4'>Métadonnées</Header>
          </Segment>
          <Segment attached>
            <List>
              <List.Item>Identifiant de l'analyse : {info.id}</List.Item>
              <List.Item>Date de création : {info.created}</List.Item>
              <List.Item>Dernière modification : {info.modified}</List.Item>
              <List.Item>Auteur : {info.nom_utilisateur}</List.Item>
            </List>
          </Segment>
        </Segment.Group>
      </Grid.Column>
    </Grid.Row>
  );
};

export default InformationsPrincipalesComponent;
