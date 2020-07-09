import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Grid,
  Label,
  Table,
  Icon,
} from 'semantic-ui-react';

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
                <Table.HeaderCell></Table.HeaderCell>
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
                        produits.map((p) => (
                          <Label basic key={p.id}>
                            {p.libelle}
                          </Label>
                        ))}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button
                        size='mini'
                        icon
                        basic
                        circular
                        as={NavLink}
                        to={`/production/${id}/delete`}
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
          <Button color='teal' as={NavLink} to='/production/create'>
            Nouvelle production
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ListProductionsPage;
