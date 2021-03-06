import React, { Fragment } from 'react';
import {
  Table,
  Transition,
  Button,
  Icon,
  Message,
  Grid,
} from 'semantic-ui-react';
import formatMoney from '../../../app/utils/formatMoney';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import capitalize from '../../../app/utils/capitalize';

const DepensesLibresComponent = ({ depenses_libres, deleteDepenseLibre }) => {
  return (
    <Fragment>
      {depenses_libres.length === 0 && (
        <Grid.Column width={5}>
          <Message>Aucune dépense libre pour le moment</Message>
        </Grid.Column>
      )}
      {depenses_libres.length > 0 && (
        <Grid.Column width={10}>
          <Table singleLine compact selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Libelle</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Mois</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Montant</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Transition.Group as={Table.Body}>
              {depenses_libres &&
                depenses_libres.map(({ id, libelle, mois_reel, montant }) => {
                  return (
                    <Table.Row key={id}>
                      <Table.Cell>{capitalize(libelle)}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        {capitalize(
                          format(new Date(mois_reel), 'MMMM yyyy', {
                            locale: fr,
                          })
                        )}
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        {montant && formatMoney(montant)}
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Button
                          size='mini'
                          icon
                          basic
                          circular
                          onClick={() => deleteDepenseLibre(id)}
                        >
                          <Icon name='trash' />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Transition.Group>
          </Table>
        </Grid.Column>
      )}
    </Fragment>
  );
};

export default DepensesLibresComponent;
