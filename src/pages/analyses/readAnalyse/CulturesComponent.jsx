import { format } from 'date-fns';
import React from 'react';
import {
  Button,
  Grid,
  Icon,
  Label,
  Table,
  Transition,
} from 'semantic-ui-react';
import capitalize from '../../../app/utils/capitalize';
import { fr } from 'date-fns/locale';
import { NavLink } from 'react-router-dom';

const CulturesComponent = ({
  fichesLibres,
  analyse_id,
  deleteFicheTechniqueLibre,
}) => {
  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <Table>
          <Table.Header>
            <Table.Row textAlign='center'>
              <Table.HeaderCell textAlign='left'>Culture</Table.HeaderCell>
              <Table.HeaderCell>Surface</Table.HeaderCell>
              <Table.HeaderCell>Date de semis/plantation</Table.HeaderCell>
              <Table.HeaderCell>Catégorie</Table.HeaderCell>
              <Table.HeaderCell>Main d'oeuvre familiale</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Transition.Group as={Table.Body}>
            {fichesLibres &&
              fichesLibres.map((fiche) => {
                return (
                  <Table.Row textAlign='center'>
                    <Table.Cell textAlign='left'>
                      {capitalize(fiche.libelle_fiche_technique)}
                    </Table.Cell>
                    <Table.Cell>
                      {new Intl.NumberFormat().format(
                        fiche.coeff_surface_ou_nombre_animaux
                      )}
                      ha
                    </Table.Cell>
                    <Table.Cell>
                      {format(new Date(fiche.date_ini), 'dd MMMM yyyy', {
                        locale: fr,
                      })}
                    </Table.Cell>
                    <Table.Cell>
                      <Label size='small'>{fiche.type_production}</Label>
                    </Table.Cell>
                    <Table.Cell>
                      {fiche.coeff_main_oeuvre_familiale * 100} %
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        as={NavLink}
                        to={`/analyse/${analyse_id}/fiche-technique-libre/${fiche.id}`}
                        size='mini'
                        color='blue'
                      >
                        Configurer
                      </Button>
                      <Button
                        onClick={() => {
                          deleteFicheTechniqueLibre(fiche.id);
                        }}
                        size='mini'
                        icon
                        basic
                        circular
                        floated='right'
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
    </Grid.Row>
  );
};

export default CulturesComponent;
