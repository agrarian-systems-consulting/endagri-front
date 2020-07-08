import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, Button, Grid, Table } from 'semantic-ui-react';

const ListMarchesPage = () => {
  const [marches, setMarches] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3333/marches');
      setMarches(res.data);
    };
    fetchData();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section active>Marchés</Breadcrumb.Section>
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
                <Table.HeaderCell>Produit</Table.HeaderCell>
                <Table.HeaderCell>Type de vente</Table.HeaderCell>
                <Table.HeaderCell>Localisation</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {marches &&
                marches.map(
                  ({
                    id,
                    libelle_production,
                    libelle_produit,
                    localisation,
                    type_marche,
                    unite,
                  }) => {
                    return (
                      <Table.Row key={id}>
                        <Table.Cell>
                          <NavLink to={`/marche/${id}`}>Marché {id}</NavLink>
                        </Table.Cell>
                        <Table.Cell>{libelle_production}</Table.Cell>
                        <Table.Cell>{libelle_produit}</Table.Cell>
                        <Table.Cell>{type_marche}</Table.Cell>
                        <Table.Cell>{localisation}</Table.Cell>
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
          <Button color='teal' as={NavLink} to='/marche/create'>
            Nouveau marché
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ListMarchesPage;
