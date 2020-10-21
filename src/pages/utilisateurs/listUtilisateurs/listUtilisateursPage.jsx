import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Breadcrumb, Table, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import capitalize from '../../../app/utils/capitalize';
import authHeader from '../../../app/auth/auth-header';

const ListUtilisateursPage = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_URI}/utilisateurs`,
        {
          headers: authHeader(),
        }
      );
      setUtilisateurs(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Breadcrumb>
            <Breadcrumb.Section active>Utilisateurs</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button
            floated='right'
            color='teal'
            as={NavLink}
            to='/utilisateur/create'
          >
            Nouvel utilisateur
          </Button>
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
                    <Table.HeaderCell>Matricule</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {utilisateurs.map(({ matricule, role }) => {
                    return (
                      <Table.Row key={matricule}>
                        <Table.Cell>
                          <NavLink to={`/utilisateur/${matricule}`}>
                            {matricule}
                          </NavLink>
                        </Table.Cell>
                        <Table.Cell>
                          <NavLink to={`/utilisateur/${matricule}`}>
                            {role}
                          </NavLink>
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            size='mini'
                            icon
                            basic
                            circular
                            as={NavLink}
                            to={`/utilisateur/${matricule}/delete`}
                          >
                            <Icon name='trash' />
                          </Button>
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
              <Button color='teal' as={NavLink} to='/utilisateur/create'>
                Nouvel utilisateur
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      )}
    </Grid>
  );
};

export default ListUtilisateursPage;
