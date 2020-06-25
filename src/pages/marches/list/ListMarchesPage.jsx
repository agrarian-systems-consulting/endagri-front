import React, { useState, useEffect } from 'react';
import { Grid, Breadcrumb, Table, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const ListMarchesPage = () => {
  const [marches, setMarches] = useState([
    {
      id: 1,
      id_produit: 3,
      libelle_production: 'Orge',
      libelle_produit: "Grains d'orge",
      unite: 'quintal',
      localisation: 'Bizerte',
      type_vente: 'Vente bords champs',
      prix_january: 100,
      prix_february: 110,
      prix_march: 110,
      prix_april: 120,
      prix_may: 115,
      prix_june: 130,
      prix_july: 135,
      prix_august: 90,
      prix_september: 40,
      prix_october: 40,
      prix_november: 80,
      prix_december: 95,
    },
    {
      id: 2,
      id_produit: 8,
      libelle_production: 'Bovins laitiers race Tarantaise',
      libelle_produit: 'Lait',
      unite: 'Litre',
      localisation: 'Bizerte',
      type_vente: 'Vente usine',
      prix_january: 100,
      prix_february: 110,
      prix_march: 110,
      prix_april: 120,
      prix_may: 115,
      prix_june: 130,
      prix_july: 135,
      prix_august: 90,
      prix_september: 40,
      prix_october: 40,
      prix_november: 80,
      prix_december: 95,
    },
  ]);

  useEffect(() => {
    async function getMarches() {
      // axios.get
      // const data = await MyAPI.getAnalyses();
      // setFiches(data)
    }
    getMarches();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section active>Marchés</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Production</Table.HeaderCell>
                <Table.HeaderCell>Produit</Table.HeaderCell>
                <Table.HeaderCell>Type de vente</Table.HeaderCell>
                <Table.HeaderCell>Localisation</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {marches.map(
                ({
                  id,
                  libelle_production,
                  libelle_produit,
                  localisation,
                  type_vente,
                  unite,
                }) => {
                  return (
                    <Table.Row key={id}>
                      <Table.Cell>
                        <NavLink to={`/marche/${id}`}>Marché {id}</NavLink>
                      </Table.Cell>
                      <Table.Cell>{libelle_production}</Table.Cell>
                      <Table.Cell>{libelle_produit}</Table.Cell>
                      <Table.Cell>{type_vente}</Table.Cell>
                      <Table.Cell>{localisation}</Table.Cell>
                    </Table.Row>
                  );
                }
              )}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Button color='teal' as={NavLink} to='/marche/create'>
            Nouveau marché
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ListMarchesPage;
