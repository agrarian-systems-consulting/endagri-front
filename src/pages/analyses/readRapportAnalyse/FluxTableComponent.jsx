import React from 'react';
import { Table } from 'semantic-ui-react';
import formatMoney from '../../../app/utils/formatMoney';

const FluxTableComponent = ({ flux }) => {
  return (
    <Table fixed selectable basic='very'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Mois</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>Dépenses</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>Ventes</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>Solde</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>Trésorerie</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {flux.map(
          ({ mois, total_depenses, total_ventes, solde, solde_cumule }) => {
            return (
              <Table.Row>
                <Table.Cell>{mois}</Table.Cell>
                <Table.Cell textAlign='right'>
                  {formatMoney(total_depenses)}
                </Table.Cell>
                <Table.Cell textAlign='right'>
                  {formatMoney(total_ventes)}
                </Table.Cell>
                <Table.Cell textAlign='right'>{formatMoney(solde)}</Table.Cell>
                <Table.Cell textAlign='right'>
                  {formatMoney(solde_cumule)}
                </Table.Cell>
              </Table.Row>
            );
          }
        )}
      </Table.Body>
    </Table>
  );
};

export default FluxTableComponent;
