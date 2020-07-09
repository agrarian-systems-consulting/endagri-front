import React, { Fragment } from 'react';
import { Grid, Segment, List, Label, Icon } from 'semantic-ui-react';
import getMois from '../../../app/utils/getMois';
const InformationsPrincipalesComponent = ({ fiche }) => {
  return (
    <Grid.Column width={6}>
      <Segment.Group>
        <Segment attached='top' clearing>
          <h5>Détail de la fiche technique </h5>
        </Segment>
        <Segment attached='bottom' clearing>
          <List>
            <List.Item>Fiche {fiche.id}</List.Item>
            <List.Item>{fiche.libelle}</List.Item>
            <List.Item>
              <Label>{fiche.type_production}</Label>
            </List.Item>
            {
              {
                'Culture annuelle': (
                  <List.Item>
                    <Icon color='grey' name='calendar check outline' />
                    Semis possible entre {getMois(fiche.ini_debut)} et{' '}
                    {getMois(fiche.ini_fin)}
                  </List.Item>
                ),
                'Elevage naisseur': (
                  <List.Item>
                    <Icon color='grey' name='calendar check outline' />
                    Mise-bas possible entre {getMois(fiche.ini_debut)} et{' '}
                    {getMois(fiche.ini_fin)}
                  </List.Item>
                ),
              }[fiche.type_production]
            }
          </List>

          {/* <Button floated='right' >
              Modifier
            </Button> */}
        </Segment>
      </Segment.Group>
    </Grid.Column>
  );
};

export default InformationsPrincipalesComponent;
