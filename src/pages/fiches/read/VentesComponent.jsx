import React from 'react';
import { Grid, Table } from 'semantic-ui-react';

const VentesComponent = ({ ventes }) => {
  return (
    <Grid.Column width={16}>
      <h5>Ventes</h5>
      <Table fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Libelle</Table.HeaderCell>
            <Table.HeaderCell>Rendement min.</Table.HeaderCell>
            <Table.HeaderCell>Rendement moy.</Table.HeaderCell>
            <Table.HeaderCell>Rendement max.</Table.HeaderCell>
            <Table.HeaderCell>Mois</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ventes.map(
            ({
              id,
              id_marche,
              rendement_min,
              rendement,
              rendement_max,
              mois_relatif,
              mois,
            }) => {
              return (
                <Table.Row key={id}>
                  <Table.Cell>{id_marche} Nom du marché Nom produit</Table.Cell>
                  <Table.Cell>{rendement_min} unité</Table.Cell>
                  <Table.Cell>{rendement} unité</Table.Cell>
                  <Table.Cell>{rendement_max} unité</Table.Cell>
                  <Table.Cell>
                    {mois_relatif} {mois}
                  </Table.Cell>
                </Table.Row>
              );
            }
          )}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
};

export default VentesComponent;
