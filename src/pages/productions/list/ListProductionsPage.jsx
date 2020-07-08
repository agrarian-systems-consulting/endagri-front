import React, { useState, useEffect } from 'react';
import { Grid, Breadcrumb, Table, Button, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ListProductionsPage = () => {
  const [productions, setProductions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3333/productions');
      setProductions(res.data);
    };

    fetchData();
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
                <Table.HeaderCell textAlign='center'>
                  Catégorie
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  Production
                </Table.HeaderCell>
                <Table.HeaderCell>Produits associés</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {productions.map(({ id, libelle, type_production, produits }) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell textAlign='center'>
                      {
                        {
                          'Culture annuelle': <Label>{type_production}</Label>,
                          'Culture pérenne': (
                            <Label color='blue'>{type_production}</Label>
                          ),
                          'Elevage bovin laitier': (
                            <Label color='orange'>{type_production}</Label>
                          ),
                          'Elevage ovin engraisseur': (
                            <Label color='yellow'>{type_production}</Label>
                          ),
                          'Elevage ovin naisseur-engraisseur': (
                            <Label color='yellow'>{type_production}</Label>
                          ),
                          'Elevage apicole': (
                            <Label tag color='yellow'>
                              {type_production}
                            </Label>
                          ),
                        }[type_production]
                      }
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <NavLink to={`/production/${id}`}>{libelle}</NavLink>
                    </Table.Cell>
                    <Table.Cell>
                      {produits.length > 0 &&
                        produits.map((p) => <Label basic>{p.libelle}</Label>)}
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
          <Button color='teal' as={NavLink} to='/production/create'>
            Nouvelle production
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ListProductionsPage;
