import React, { Fragment } from 'react';
import {
  Grid,
  Segment,
  List,
  Label,
  Card,
  Icon,
  Button,
  Transition,
} from 'semantic-ui-react';
const ProductionsComponent = ({ fichesLibres, deleteFicheTechniqueLibre }) => {
  return (
    <Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <Transition.Group as={Card.Group}>
            {fichesLibres &&
              fichesLibres.map((fiche) => {
                return (
                  <Card key={fiche.id}>
                    <Card.Content>
                      <h5>{fiche.id_fiche_technique}</h5>{' '}
                    </Card.Content>
                    <Card.Content>
                      <Label>Catégorie</Label>
                      <List>
                        <List.Item></List.Item>
                        <List.Item>
                          {fiche.id} basé sur la fiche{' '}
                          {fiche.id_fiche_technique}{' '}
                        </List.Item>

                        <List.Item>
                          Surface ou nombre d'animaux :{' '}
                          {fiche.coeff_surface_ou_nombre_animaux}
                        </List.Item>
                        <List.Item>
                          Part du travail réalisé par de la main d'oeuvre
                          familiale: {fiche.coeff_main_oeuvre_familiale}
                        </List.Item>
                        <List.Item>
                          Date de semis ou mise-bas : {fiche.date_ini}
                        </List.Item>
                      </List>
                    </Card.Content>
                    <Card.Content extra>
                      <Button size='mini' color='blue'>
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
                    </Card.Content>
                  </Card>
                );
              })}
          </Transition.Group>
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  );
};

export default ProductionsComponent;
