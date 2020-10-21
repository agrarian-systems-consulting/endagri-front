import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Breadcrumb, Table, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import capitalize from '../../../app/utils/capitalize';
import authHeader from '../../../app/auth/auth-header';
import useUser from '../../../app/auth/useUser';

const ListFichesPage = () => {
  const [fiches, setFiches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { utilisateur } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`${process.env.REACT_APP_API_URI}/fiches`, {
        headers: authHeader(),
      });
      setFiches(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Breadcrumb>
            <Breadcrumb.Section active>Fiches techniques</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
        <Grid.Column width={4}>
          {['SUPER_ADMIN', 'ADMINISTRATEUR_ENDAGRI'].includes(
            utilisateur.role
          ) && (
            <Button
              floated='right'
              color='teal'
              as={NavLink}
              to='/fiche/create'
            >
              Nouvelle fiche
            </Button>
          )}
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
                            <NavLink to={`/fiche/${id}`}>
                              {capitalize(libelle)}
                            </NavLink>
                          </Table.Cell>
                          <Table.Cell>
                            {capitalize(libelle_production)}
                          </Table.Cell>
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
        </Fragment>
      )}
    </Grid>
  );
};

export default ListFichesPage;
