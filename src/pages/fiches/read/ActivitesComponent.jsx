import React, { useState } from 'react';
import { Grid, Table, Button, Icon } from 'semantic-ui-react';
import getMois from '../../../app/utils/getMois';
import CreateActiviteComponent from './CreateActiviteComponent';

const ActivitesComponent = ({ activites }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <Grid.Column width={10}>
      <h5>Activités</h5>
      <Table singleLine compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Libelle</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Mois</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Dépenses</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {activites.map(
            ({ id, libelle_activite, mois_relatif, mois, depenses }) => {
              return (
                <Table.Row key={id}>
                  <Table.Cell>{libelle_activite}</Table.Cell>
                  <Table.Cell textAlign='center'>
                    {mois_relatif} {mois && getMois(mois)}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {depenses.reduce((acc, { montant }) => acc + montant, 0)}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button size='mini' icon circular>
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
          Ajouter une activité
        </Button>
      )}

      {isFormOpen && <CreateActiviteComponent />}
    </Grid.Column>
  );
};

export default ActivitesComponent;
