import React, { useState, Fragment } from 'react';
import { Grid, Table, Button, Icon, Transition } from 'semantic-ui-react';
import useUser from '../../../app/auth/useUser';
import getMois from '../../../app/utils/getMois';
import CreateVenteComponent from './VenteFormComponent';

const VentesComponent = ({ ventes, deleteVente, postVente, id_production }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { utilisateur } = useUser();

  return (
    <Grid.Column width={16}>
      <h5>Ventes</h5>
      <Table singleLine compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Libelle</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Mois</Table.HeaderCell>

            <Table.HeaderCell textAlign='center'>
              Rendement min.
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              Rendement moy.
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              Rendement max.
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Transition.Group as={Table.Body}>
          {ventes && ventes.length === 0 ? (
            <Table.Row>
              <Table.Cell>Aucune vente pour le moment...</Table.Cell>
            </Table.Row>
          ) : (
            <Fragment>
              {ventes &&
                ventes.map(
                  ({
                    id,
                    id_marche,
                    libelle_produit,
                    type_marche,
                    localisation,
                    unite,
                    rendement_min,
                    rendement,
                    rendement_max,
                    mois_relatif,
                    mois,
                    annee,
                  }) => {
                    return (
                      <Table.Row key={id}>
                        <Table.Cell>
                          {id_marche && (
                            <Fragment>
                              {libelle_produit}
                              {' - '}
                              {type_marche}
                              {' - '}
                              {localisation}
                            </Fragment>
                          )}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {mois_relatif}{' '}
                          {mois && (
                            <Fragment>
                              {getMois(mois)} {annee == '1' ? '(n+1)' : ''}
                            </Fragment>
                          )}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {rendement_min &&
                            parseFloat(rendement_min, 10).toFixed(2)}{' '}
                          {rendement_min && unite}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {rendement && parseFloat(rendement, 10).toFixed(2)}{' '}
                          {rendement && unite}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {rendement_max &&
                            parseFloat(rendement_max, 10).toFixed(2)}{' '}
                          {rendement_max && unite}
                        </Table.Cell>

                        <Table.Cell>
                          {['SUPER_ADMIN', 'ADMINISTRATEUR_ENDAGRI'].includes(
                            utilisateur.role
                          ) && (
                            <Button
                              onClick={() => deleteVente(id)}
                              size='mini'
                              icon
                              basic
                              circular
                            >
                              <Icon name='trash' />
                            </Button>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                )}
            </Fragment>
          )}
        </Transition.Group>
      </Table>
      {['SUPER_ADMIN', 'ADMINISTRATEUR_ENDAGRI'].includes(utilisateur.role) && (
        <Fragment>
          {isFormOpen ? (
            <Button onClick={() => setIsFormOpen(false)}>Fermer</Button>
          ) : (
            <Button color='blue' onClick={() => setIsFormOpen(true)}>
              Ajouter une vente
            </Button>
          )}

          {isFormOpen && (
            <CreateVenteComponent
              postVente={postVente}
              id_production={id_production}
            />
          )}
        </Fragment>
      )}
    </Grid.Column>
  );
};

export default VentesComponent;
