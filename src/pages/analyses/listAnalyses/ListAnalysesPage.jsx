import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, Button, Grid, Table } from 'semantic-ui-react';
import Axios from 'axios';

const ListAnalysesPage = () => {
  const [analyses, setAnalyses] = useState([
    {
      id: 1,
      created: '2020-06-09',
      modified: '2020-06-09',
      nom_utilisateur: 'Hugo',
      nom_client: 'Client A',
      montant_tresorerie_initiale: 1500,
      date_debut_analyse: '2019-12-31T23:00:00.000Z',
      date_fin_analyse: '2020-12-31T23:00:00.000Z',
    },
    {
      id: 2,
      created: '2020-06-09',
      modified: '2020-06-09',
      nom_utilisateur: 'Florian',
      nom_client: 'Client B',
      montant_tresorerie_initiale: 1234,
      date_debut_analyse: '2020-05-05',
      date_fin_analyse: '2021-05-05',
    },
  ]);

  useEffect(() => {
    const fetchData = () => {
      Axios(`http://localhost:3333/analyses`)
        .then((res) => {
          setAnalyses(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section active>Analyses</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Table singleLine fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Auteur</Table.HeaderCell>
                <Table.HeaderCell>Client</Table.HeaderCell>
                <Table.HeaderCell>Date de création</Table.HeaderCell>
                <Table.HeaderCell>Dernière modification</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {analyses.map(
                ({ id, nom_utilisateur, nom_client, created, modified }) => {
                  return (
                    <Table.Row key={id}>
                      <Table.Cell>
                        <NavLink to={`/analyse/${id}`}>Analyse {id}</NavLink>
                      </Table.Cell>
                      <Table.Cell>{nom_utilisateur}</Table.Cell>
                      <Table.Cell>{nom_client}</Table.Cell>
                      <Table.Cell> {created}</Table.Cell>
                      <Table.Cell>{modified}</Table.Cell>
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
          <Button color='teal' as={NavLink} to='/analyse/create'>
            Nouvelle analyse
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ListAnalysesPage;
