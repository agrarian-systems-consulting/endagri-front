import React from 'react';
import { Grid, Segment, List, Label } from 'semantic-ui-react';

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
            <List.Item>Date ini début</List.Item>
            <List.Item>Date ini fin</List.Item>
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
