import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Breadcrumb, Table, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

const ListFichesPage = () => {
  const [fiches, setFiches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`http://localhost:3333/fiches`);
      setFiches(res.data);
      setLoading(false);
    };
    fetchData();
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
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <Fragment>
          <Grid.Row>
            <Grid.Column width={16}>
              <Table singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Libellé</Table.HeaderCell>
                    <Table.HeaderCell>Production</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {fiches.map(
                    ({
                      id,
                      libelle_production,
                      libelle,
                      created,
                      modified,
                    }) => {
                      return (
                        <Table.Row key={id}>
                          <Table.Cell>
                            <NavLink to={`/fiche/${id}`}>Fiche {id}</NavLink>
                          </Table.Cell>
                          <Table.Cell>
                            <NavLink to={`/fiche/${id}`}>{libelle}</NavLink>
                          </Table.Cell>
                          <Table.Cell>{libelle_production}</Table.Cell>
                          <Table.Cell>
                            <Button
                              size='mini'
                              icon
                              basic
                              circular
                              as={NavLink}
                              to={`/fiche/${id}/delete`}
                            >
                              <Icon name='trash' />
                            </Button>
                          </Table.Cell>
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
              <Button color='teal' as={NavLink} to='/fiche/create'>
                Nouvelle fiche
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      )}
    </Grid>
  );
};

export default ListFichesPage;
