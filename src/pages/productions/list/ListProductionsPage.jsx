import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Breadcrumb, Button, Grid, Label, Table } from 'semantic-ui-react';
import _ from 'lodash';
import authHeader from '../../../app/auth/auth-header';
import useUser from '../../../app/auth/useUser';

const ListProductionsPage = () => {
  const [productions, setProductions] = useState([]);
  const { utilisateur } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}/productions`,
        { headers: authHeader() }
      );
      setProductions(res.data);
    };

    fetchData();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Breadcrumb>
            <Breadcrumb.Section active>Productions</Breadcrumb.Section>
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
              to='/production/create'
            >
              Nouvelle production
            </Button>
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Production</Table.HeaderCell>
                <Table.HeaderCell>Produits associés</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {productions.map(({ id, libelle, type_production, produits }) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell>Production {id}</Table.Cell>
                    <Table.Cell>
                      {
                        {
                          'Culture annuelle': (
                            <Button
                              as={Link}
                              size='small'
                              to={`/production/${id}`}
                            >
                              {_.capitalize(libelle)}
                            </Button>
                          ),
                          'Culture pérenne': (
                            <Button
                              as={Link}
                              size='small'
                              to={`/production/${id}`}
                              color='blue'
                            >
                              {_.capitalize(libelle)}
                            </Button>
                          ),
                          'Elevage bovin laitier': (
                            <Button
                              as={Link}
                              size='small'
                              to={`/production/${id}`}
                              color='orange'
                            >
                              {_.capitalize(libelle)}
                            </Button>
                          ),
                          'Elevage ovin engraisseur': (
                            <Button
                              as={Link}
                              size='small'
                              to={`/production/${id}`}
                              color='yellow'
                            >
                              {_.capitalize(libelle)}
                            </Button>
                          ),
                          'Elevage ovin naisseur-engraisseur': (
                            <Button
                              as={Link}
                              size='mini'
                              to={`/production/${id}`}
                              color='violet'
                            >
                              {_.capitalize(libelle)}
                            </Button>
                          ),
                          'Elevage apicole': (
                            <Button
                              as={Link}
                              size='mini'
                              to={`/production/${id}`}
                              color='yellow'
                            >
                              {_.capitalize(libelle)}
                            </Button>
                          ),
                        }[type_production]
                      }
                    </Table.Cell>

                    <Table.Cell>
                      {produits.length > 0 &&
                        produits.map(
                          (p) =>
                            p.id !== null && (
                              <Label basic key={p.id}>
                                {_.capitalize(p.libelle)}
                              </Label>
                            )
                        )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ListProductionsPage;
