import React from 'react';
import { Grid, Segment, List, Label } from 'semantic-ui-react';
import getMois from '../../../app/utils/getMois';
const InformationsPrincipalesComponent = ({ fiche }) => {
  return (
    <Grid.Column width={6}>
      <Segment.Group>
        <Segment attached='top' clearing>
          <h5>Détail de la fiche technique {fiche.id}</h5>
        </Segment>
        <Segment attached='bottom' clearing>
          <List>
            <List.Item>{fiche.libelle_fiche}</List.Item>
            <List.Item>
              <Label>{fiche.type_production}</Label>
            </List.Item>
            <List.Item>
              {
                {
                  'Culture annuelle': 'Semis possible entre ',
                  'Elevage naisseur': 'Mise-bas possibles entre ',
                }[fiche.type_production]
              }
              {getMois(fiche.ini_debut)} et {getMois(fiche.ini_fin)}
            </List.Item>
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
