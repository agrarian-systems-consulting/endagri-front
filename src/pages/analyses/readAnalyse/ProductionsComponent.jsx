import React from 'react';
import { Grid, Segment, List, Header } from 'semantic-ui-react';
const ProductionsComponent = ({ fichesLibres }) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <Segment.Group>
          <Segment attached='top' color='violet'>
            <Header as='h4'>Productions</Header>
          </Segment>

          {fichesLibres &&
            fichesLibres.map((fiche) => {
              return (
                <Segment attached key={fiche.id_fiche_technique_libre}>
                  <Header as='h4'>Informations principales</Header>
                  <List>
                    <List.Item>
                      Identifiant de la fiche technique associée :
                      {fiche.id_fiche_technique}
                    </List.Item>
                    <List.Item>
                      Nom de la production (à récupérer,
                      libelle_fiche_technique)
                    </List.Item>
                    <List.Item>
                      Date de semis ou mise-bas : {fiche.date_ini}
                    </List.Item>
                    <List.Item>
                      Surface ou nombre d'animaux :{' '}
                      {fiche.coeff_surface_ou_nombre_animaux}
                    </List.Item>
                    <List.Item>
                      Part du travail réalisé par de la main d'oeuvre familiale:{' '}
                      {fiche.coeff_main_oeuvre_familiale}
                    </List.Item>
                  </List>
                  <Header as='h4'>Ventes</Header>
                  <List>
                    {fiche.coeff_ventes.map((vente) => {
                      return (
                        <List.Item>
                          <List>
                            <List.Item>
                              Produit vendu : {vente.libelle_categorie}
                            </List.Item>
                            <List.Item>
                              Il faudrait avoir le vrai rendement ici pour faire
                              les calculs qui vont bien Rendement :{' '}
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
                  <Header as='h4'>Dépenses</Header>
                  <List>
                    {fiche.coeff_depenses.map((depense) => {
                      return (
                        <List.Item>
                          <List>
                            <List.Item>
                              Catégorie de dépense :{depense.libelle_categorie}
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
              );
            })}
        </Segment.Group>
      </Grid.Column>
    </Grid.Row>
  );
};

export default ProductionsComponent;
