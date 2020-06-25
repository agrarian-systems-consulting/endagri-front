import React, { useState, useEffect } from 'react';
import { Grid, Breadcrumb, Table, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const ListFichesPage = () => {
  const [fiches, setFiches] = useState([
    {
      id: 1,
      id_production: 24,
      production: 'Carottes',
      libelle: 'Carottes en sols sableux',
      id_utilisateur: 63,
      utilisateur: 'Asma Turki',
      ini_debut: 3,
      ini_fin: 5,
      modified: '2021-07-10',
      created: '2021-07-05',
      commentaire: 'Un commentaire sur cette première fiche',
    },
    {
      id: 2,
      id_production: 24,
      production: 'Carottes',
      libelle: 'Carottes en sols argileux',
      id_utilisateur: 63,
      utilisateur: 'Asma Turki',
      ini_debut: 3,
      ini_fin: 5,
      modified: '2021-07-08',
      created: '2021-07-07',
      commentaire: 'Un commentaire sur cette seconde fiche',
    },
  ]);

  useEffect(() => {
    async function getFiches() {
      // axios.get
      // const data = await MyAPI.getAnalyses();
      // setFiches(data)
    }
    getFiches();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section active>Fiches techniques</Breadcrumb.Section>
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
                <Table.HeaderCell>Libellé</Table.HeaderCell>
                <Table.HeaderCell>Date de création</Table.HeaderCell>
                <Table.HeaderCell>Dernière modification</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
          
              {fiches.map(({ id, production, libelle, created, modified }) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <NavLink to={`/fiche/${id}`}>Fiche {id}</NavLink>
                    </Table.Cell>
                    <Table.Cell>{production}</Table.Cell>
                    <Table.Cell>{libelle}</Table.Cell>
                    <Table.Cell>{created}</Table.Cell>
                    <Table.Cell>{modified}</Table.Cell>
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

export default ListFichesPage;
