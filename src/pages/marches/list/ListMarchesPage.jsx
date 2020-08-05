import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, Button, Grid, Table, Icon } from 'semantic-ui-react';

const ListMarchesPage = () => {
  const [marches, setMarches] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://endagriapi.geomatick.com/marches');
      setMarches(res.data);
    };
    fetchData();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Breadcrumb>
            <Breadcrumb.Section active>Marchés</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button floated='right' color='teal' as={NavLink} to='/marche/create'>
            Nouveau marché
          </Button>
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
                <Table.HeaderCell></Table.HeaderCell>
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
                        <Table.Cell textAlign='center'>
                          <Button
                            size='mini'
                            icon
                            basic
                            circular
                            as={NavLink}
                            to={`/marche/${id}/delete`}
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
          <Button color='teal' as={NavLink} to='/marche/create'>
            Nouveau marché
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ListMarchesPage;
