import React, { Fragment } from 'react';
import { Grid, Segment, List, Header, Label, Button } from 'semantic-ui-react';
const ProductionsComponent = ({ fichesLibres }) => {
  return (
    <Fragment>
      <Grid.Row>
        {fichesLibres &&
          fichesLibres.map((fiche) => {
            return (
              <Grid.Column width={4} key={fiche.id_fiche_technique_libre}>
                <Segment.Group>
                  <Segment attached='top'>
                    <h5>Nom de la production</h5>
                  </Segment>
                  <Segment attached>
                    <List>
                      <List.Item>
                        <Label>Catégorie</Label>
                      </List.Item>
                      <List.Item>
                        basé sur la fiche {fiche.id_fiche_technique}{' '}
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
                  </Segment>
                  <Segment attached>
                    <h5>Ventes</h5>
                    <List>
                      {fiche.coeff_ventes &&
                        fiche.coeff_ventes.map((vente) => {
                          return (
                            <List.Item>
                              <List>
                                <List.Item>
                                  Produit vendu : {vente.libelle_categorie}
                                </List.Item>
                                <List.Item>
                                  Il faudrait avoir le vrai rendement ici pour
                                  faire les calculs qui vont bien Rendement :{' '}
                                  {vente.coeff_rendement}
                                </List.Item>
                                <List.Item>
                                  Part d'autoconsommation :
                                  {vente.coeff_autoconsommation}
                                </List.Item>
                                <List.Item>
                                  Part d'intraconsommation :
                                  {vente.coeff_intraconsommation}
                                </List.Item>
                              </List>
                            </List.Item>
                          );
                        })}
                    </List>
                  </Segment>
                  <Segment>
                    {' '}
                    <h5>Dépenses</h5>
                    <List>
                      {fiche.coeff_depenses &&
                        fiche.coeff_depenses.map((depense) => {
                          return (
                            <List.Item>
                              <List>
                                <List.Item>
                                  Catégorie de dépense :
                                  {depense.libelle_categorie}
                                </List.Item>
                                <List.Item>
                                  Part destinée aux intraconsommations :
                                  {depense.coeff_intraconsommation}
                                </List.Item>
                              </List>
                            </List.Item>
                          );
                        })}
                    </List>
                  </Segment>
                </Segment.Group>
              </Grid.Column>
            );
          })}
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Button color='teal'>Ajouter une production</Button>
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  );
};

export default ProductionsComponent;
