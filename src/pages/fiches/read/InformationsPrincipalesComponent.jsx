import React, { Fragment } from 'react';
import { Header, Icon, Label, List, Segment, Table } from 'semantic-ui-react';
import capitalize from '../../../app/utils/capitalize';
import getMois from '../../../app/utils/getMois';
const InformationsPrincipalesComponent = ({ fiche }) => {
  return (
    <Fragment>
      <h5>Détail de la fiche technique </h5>
      <Segment.Group>
        <Segment>
          <Header as='h4'>Informations sur l'analyse</Header>
        </Segment>
        <Segment attached>
          <Table basic='very' fixed>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Icon name='compass outline' /> <b>Identifiant Fiche </b>
                </Table.Cell>
                <Table.Cell>{fiche.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name='folder outline' /> <b>Catégorie</b>
                </Table.Cell>
                <Table.Cell>{fiche.type_production}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name='bullseye' /> <b>Libellé</b>
                </Table.Cell>
                <Table.Cell>{fiche.libelle}</Table.Cell>
              </Table.Row>

              {fiche.commentaire && (
                <Table.Row>
                  <Table.Cell>
                    <b>Commentaire</b>
                  </Table.Cell>
                  <Table.Cell>{fiche.commentaire}</Table.Cell>
                </Table.Row>
              )}

              <Table.Row>
                <Table.Cell colSpan='2'>
                  {
                    {
                      'Culture annuelle': (
                        <List.Item>
                          <Icon name='calendar check outline' />
                          Semis possible entre {getMois(
                            fiche.ini_debut
                          )} et {getMois(fiche.ini_fin)}
                        </List.Item>
                      ),
                      'Elevage naisseur': (
                        <List.Item>
                          <Icon name='calendar check outline' />
                          Mise-bas possible entre {getMois(
                            fiche.ini_debut
                          )} et {getMois(fiche.ini_fin)}
                        </List.Item>
                      ),
                    }[fiche.type_production]
                  }

                  {
                    {
                      'Culture annuelle': (
                        <small>Les valeurs sont données pour un hectare</small>
                      ),
                      'Culture pérenne': (
                        <small>Les valeurs sont données pour un hectare</small>
                      ),
                    }[fiche.type_production]
                  }
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default InformationsPrincipalesComponent;
