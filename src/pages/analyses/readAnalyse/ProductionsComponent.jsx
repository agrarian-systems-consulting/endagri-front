import React, { Fragment } from 'react';
import {
  Grid,
  List,
  Label,
  Card,
  Icon,
  Button,
  Transition,
} from 'semantic-ui-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
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
                      <h5>
                        {fiche.libelle_fiche_technique} (
                        {new Intl.NumberFormat().format(
                          fiche.coeff_surface_ou_nombre_animaux
                        )}{' '}
                        ha)
                      </h5>{' '}
                    </Card.Content>
                    <Card.Content>
                      <Label>{fiche.type_production}</Label>
                      <List>
                        <List.Item>
                          <b>Part de main d'oeuvre familiale :</b>{' '}
                          {fiche.coeff_main_oeuvre_familiale * 100} %
                        </List.Item>
                        <List.Item>
                          <b>Date de semis :</b>{' '}
                          {format(new Date(fiche.date_ini), 'dd MMMM yyyy', {
                            locale: fr,
                          })}
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
