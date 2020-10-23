import React from 'react';
import {
  Grid,
  Segment,
  Header,
  List,
  Button,
  Table,
  Icon,
} from 'semantic-ui-react';
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
            <Header as='h4'>Paramètres</Header>
          </Segment>
          <Segment attached clearing>
            <Table basic='very'>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Icon name='calendar alternate outline'></Icon>{' '}
                    <b>Période d'analyse </b>
                  </Table.Cell>
                  <Table.Cell>
                    {' '}
                    {info.date_debut_analyse &&
                      capitalize(
                        format(new Date(info.date_debut_analyse), 'MMMM yyyy', {
                          locale: fr,
                        })
                      )}{' '}
                    à{' '}
                    {info.date_fin_analyse &&
                      capitalize(
                        format(new Date(info.date_fin_analyse), 'MMMM yyyy', {
                          locale: fr,
                        })
                      )}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name='dot circle outline'></Icon>{' '}
                    <b>Trésorerie initiale </b>
                  </Table.Cell>
                  <Table.Cell>
                    {' '}
                    {formatMoney(info.montant_tresorerie_initiale)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
        <Button as={NavLink} to={`/analyse/1/update`} floated='right'>
          Modifier
        </Button>
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment.Group>
          <Segment>
            <Header as='h4'>Informations sur l'analyse</Header>
          </Segment>
          <Segment attached>
            <Table basic='very'>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <b>Code analyse</b>
                  </Table.Cell>
                  <Table.Cell>{info.id}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Code client </b>
                  </Table.Cell>
                  <Table.Cell>{capitalize(info.nom_client)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Auteur</b>
                  </Table.Cell>
                  <Table.Cell>{capitalize(info.nom_utilisateur)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    {' '}
                    <b>Date de création</b>{' '}
                  </Table.Cell>
                  <Table.Cell>
                    {' '}
                    {info.created &&
                      format(new Date(info.created), 'dd MMMM yyyy', {
                        locale: fr,
                      })}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
      </Grid.Column>
    </Grid.Row>
  );
};

export default InformationsPrincipalesComponent;
