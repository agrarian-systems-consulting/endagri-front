import React, { useState } from 'react';
import { Grid, Breadcrumb, Segment, List, Table } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const ReadFichePage = () => {
  const [fiche, setFiche] = useState({
    id: 42,
    libelle_fiche: 'Tomates hors-sol en agriculture biologique',
    production: 'Tomate',
    type_production: 'Culture annuelle',
    id_utilisateur: 35,
    auteur: 'Sami Laouini',
    activites: [
      {
        id: 10,
        libelle_activite: 'Labour',
        mois_relatif: -1,
        depenses: [
          {
            id: 13,
            libelle_depense: 'Tracteur',
            montant: 1500,
          },
          {
            id: 14,
            libelle_depense: "Main d'oeuvre",
            montant: 500,
          },
        ],
      },
      {
        id: 11,
        libelle_activite: 'Semis',
        mois_relatif: 0,
        depenses: [
          {
            id: 15,
            libelle_depense: 'Tracteur',
            montant: 500,
          },
          {
            id: 16,
            libelle_depense: "Main d'oeuvre",
            montant: 500,
          },
        ],
      },
      {
        id: 12,
        libelle_activite: 'Récolte',
        mois_relatif: 5,
        depenses: [
          {
            id: 17,
            libelle_depenses: "Main d'oeuvre",
            montant: 200,
          },
        ],
      },
    ],
    ventes: [
      {
        id: 13,
        id_marche: 24,
        quantite: 500,
        mois_relatif: 5,
      },
      {
        id: 14,
        id_marche: 24,
        quantite: 300,
        mois_relatif: 6,
      },
    ],
  });
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/fiches'>Fiches</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Fiche {fiche.id} - {fiche.libelle_fiche}
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Détail de la fiche technique</h5>
            </Segment>
            <Segment attached='bottom'>
              <List>
                <List.Item>Identifiant : {fiche.id}</List.Item>
                <List.Item>Libellé : {fiche.libelle_fiche}</List.Item>
                <List.Item>
                  Type de production : {fiche.type_production}
                </List.Item>
              </List>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment>
            <h5>Activités</h5>
          </Segment>
          <Table fixed>
            <Table.Header>
              <Table.HeaderCell>Libelle</Table.HeaderCell>
              <Table.HeaderCell>Mois</Table.HeaderCell>
              <Table.HeaderCell>Dépenses</Table.HeaderCell>
            </Table.Header>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadFichePage;
