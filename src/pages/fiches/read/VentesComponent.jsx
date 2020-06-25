import React, { useState } from 'react';
import { Grid, Table, Button, Icon } from 'semantic-ui-react';
import getMois from '../../../app/utils/getMois';
import CreateVenteComponent from './VenteFormComponent';

const VentesComponent = ({ ventes, deleteVente, postVente }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Grid.Column width={16}>
      <h5>Ventes</h5>
      <Table singleLine compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Libelle</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              Rendement min.
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              Rendement moy.
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              Rendement max.
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Mois</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ventes.map(
            ({
              id,
              id_marche,
              unite,
              rendement_min,
              rendement,
              rendement_max,
              mois_relatif,
              mois,
            }) => {
              return (
                <Table.Row key={id}>
                  <Table.Cell>{id_marche} Nom du marché Nom produit</Table.Cell>
                  <Table.Cell textAlign='center'>
                    {rendement_min} {rendement_min && unite}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {rendement} {rendement && unite}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {rendement_max} {rendement_max && unite}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {mois_relatif} {mois && getMois(mois)}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => deleteVente(id)}
                      size='mini'
                      icon
                      basic
                      circular
                    >
                      <Icon name='trash' />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            }
          )}
        </Table.Body>
      </Table>
      {isFormOpen ? (
        <Button onClick={() => setIsFormOpen(false)}>Annuler</Button>
      ) : (
        <Button color='blue' onClick={() => setIsFormOpen(true)}>
          Ajouter une vente
        </Button>
      )}

      {isFormOpen && <CreateVenteComponent postVente={postVente} />}
    </Grid.Column>
  );
};

export default VentesComponent;
