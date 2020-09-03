import React from 'react';
import { Grid, Segment, Header, List, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import capitalize from '../../../app/utils/capitalize';
import formatMoney from '../../../app/utils/formatMoney';

const InformationsPrincipalesComponent = ({ info }) => {
  return (
    <Grid.Row>
      <Grid.Column width={10}>
        <Segment.Group>
          <Segment attached='top' clearing>
            <Header as='h4'>Informations principales</Header>
          </Segment>
          <Segment attached clearing>
            <List>
              <List.Item>
                <b>Client </b> {capitalize(info.nom_client)}
              </List.Item>
              <List.Item>
                <b>Trésorerie initiale </b>{' '}
                {formatMoney(info.montant_tresorerie_initiale)}
              </List.Item>
              <List.Item>
                <b>Date de début d'analyse </b>
                {info.date_debut_analyse &&
                  format(new Date(info.date_debut_analyse), 'dd MMMM yyyy', {
                    locale: fr,
                  })}
              </List.Item>
              <List.Item>
                <b>Date de fin d'analyse </b>
                {info.date_fin_analyse &&
                  format(new Date(info.date_fin_analyse), 'dd MMMM yyyy', {
                    locale: fr,
                  })}
              </List.Item>
            </List>
          </Segment>
        </Segment.Group>
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment.Group>
          <Segment>
            <Header as='h4'>Métadonnées</Header>
          </Segment>
          <Segment attached>
            <List>
              <List.Item>
                <b>Identifiant de l'analyse</b> {info.id}
              </List.Item>
              <List.Item>
                <b>Date de création</b>{' '}
                {info.created &&
                  format(new Date(info.created), 'dd MMMM yyyy', {
                    locale: fr,
                  })}
              </List.Item>
              <List.Item>
                <b>Auteur</b> {capitalize(info.nom_utilisateur)}
              </List.Item>
            </List>
          </Segment>
        </Segment.Group>
        <Button as={NavLink} to={`/analyse/1/update`} floated='right'>
          Modifier
        </Button>
      </Grid.Column>
    </Grid.Row>
  );
};

export default InformationsPrincipalesComponent;
