import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, Button, Grid, Table } from 'semantic-ui-react';
import Axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import capitalize from '../../../app/utils/capitalize';

const ListAnalysesPage = () => {
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      Axios(`${process.env.REACT_APP_API_URI}/analyses`)
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
        <Grid.Column width={12}>
          <Table singleLine fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Auteur</Table.HeaderCell>
                <Table.HeaderCell>Client</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  Date de création
                </Table.HeaderCell>
                {/* <Table.HeaderCell>Dernière modification</Table.HeaderCell> */}
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
                      <Table.Cell>{capitalize(nom_utilisateur)}</Table.Cell>
                      <Table.Cell>{capitalize(nom_client)}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        {' '}
                        {format(new Date(created), 'dd MMMM yyyy', {
                          locale: fr,
                        })}
                      </Table.Cell>
                      {/* <Table.Cell>{modified}</Table.Cell> */}
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
