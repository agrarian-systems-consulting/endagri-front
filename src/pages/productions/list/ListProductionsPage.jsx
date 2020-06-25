import React, { useState, useEffect } from 'react';
import { Grid, Breadcrumb, Table, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const ListProductionsPage = () => {
  const [productions, setProductions] = useState([
    {
      id: 1,
      libelle: 'Blé dur',
      type_production: 'Culture annuelle',
      produits: [
        {
          id: 1,
          libelle: 'Paille de blé dur',
          unite: 'tonne de matière sèche',
        },
        {
          id: 2,
          libelle: 'Grains de blé dur',
          unite: 'quintal',
        },
      ],
    },
    {
      id: 2,
      libelle: 'Bovins laitiers de race Tarentaise',
      type_production: 'Elevage naisseur laitier',
      produits: [
        {
          id: 3,
          libelle: 'Lait',
          unite: 'Litres',
        },
        {
          id: 4,
          libelle: 'Veaux',
          unite: 'unité',
        },
        {
          id: 5,
          libelle: 'Femelles adultes',
          unite: 'unité',
        },
        {
          id: 6,
          libelle: 'Mâles adultes',
          unite: 'unité',
        },
        {
          id: 7,
          libelle: 'Vaches de réforme',
          unite: 'unité',
        },
        {
          id: 8,
          libelle: 'Fumier',
          unite: 'tonne de matière fraîche',
        },
      ],
    },
  ]);

  useEffect(() => {
    async function getProductions() {
      // axios.get
      // const data = await MyAPI.getAnalyses();
      // setFiches(data)
    }
    getProductions();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section active>Productions</Breadcrumb.Section>
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
                <Table.HeaderCell>Catégorie</Table.HeaderCell>
                <Table.HeaderCell>Produits associés</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {productions.map(({ id, libelle, type_production, produits }) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <NavLink to={`/production/${id}`}>
                        Production {id}
                      </NavLink>
                    </Table.Cell>
                    <Table.Cell>{libelle}</Table.Cell>
                    <Table.Cell>
                      <Label tag>{type_production}</Label>
                    </Table.Cell>
                    <Table.Cell>
                      {produits.map((p) => (
                        <Label>{p.libelle}</Label>
                      ))}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Button color='teal' as={NavLink} to='/fiche/create'>
            Nouvelle fiche
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ListProductionsPage;
