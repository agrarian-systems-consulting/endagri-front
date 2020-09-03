import React, { Fragment, useState } from 'react';
import { Button, Icon, Table, Transition } from 'semantic-ui-react';
import formatMoney from '../../../app/utils/formatMoney';
import getMois from '../../../app/utils/getMois';
import ActiviteFormComponent from './ActiviteFormComponent.jsx';
import capitalize from '../../../app/utils/capitalize';

const ActivitesComponent = ({ activites, deleteActivite, postActivite }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <Fragment>
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
        {activites && activites.length === 0 ? (
          <Transition.Group as={Table.Body}>
            <Table.Row>
              <Table.Cell>Aucune activité pour le moment...</Table.Cell>
            </Table.Row>
          </Transition.Group>
        ) : (
          <Transition.Group as={Table.Body}>
            {activites &&
              activites.map(({ id, libelle, mois_relatif, mois, depenses }) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell>{capitalize(libelle)}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      {mois_relatif} {mois && getMois(mois)}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {depenses &&
                        formatMoney(
                          depenses.reduce(
                            (acc, { montant }) => acc + montant,
                            0
                          )
                        )}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button
                        size='mini'
                        icon
                        basic
                        circular
                        onClick={() => deleteActivite(id)}
                      >
                        <Icon name='trash' />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Transition.Group>
        )}
      </Table>
      {isFormOpen ? (
        <Button onClick={() => setIsFormOpen(false)}>Annuler</Button>
      ) : (
        <Button color='blue' onClick={() => setIsFormOpen(true)}>
          Ajouter une activité
        </Button>
      )}

      {isFormOpen && <ActiviteFormComponent postActivite={postActivite} />}
    </Fragment>
  );
};

export default ActivitesComponent;
