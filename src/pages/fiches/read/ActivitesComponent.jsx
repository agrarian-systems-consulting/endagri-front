import React, { useState } from 'react';
import { Grid, Table, Button } from 'semantic-ui-react';
import getMois from '../../../app/utils/getMois';
import CreateActiviteComponent from './CreateActiviteComponent';

const ActivitesComponent = ({ activites }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <Grid.Column width={10}>
      <h5>Activités</h5>
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Libelle</Table.HeaderCell>
            <Table.HeaderCell>Mois</Table.HeaderCell>
            <Table.HeaderCell>Dépenses</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {activites.map(
            ({ id, libelle_activite, mois_relatif, mois, depenses }) => {
              return (
                <Table.Row key={id}>
                  <Table.Cell>{libelle_activite}</Table.Cell>
                  <Table.Cell>
                    {mois_relatif} {mois && getMois(mois)}
                  </Table.Cell>
                  <Table.Cell>
                    {depenses.reduce((acc, { montant }) => acc + montant, 0)}
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
