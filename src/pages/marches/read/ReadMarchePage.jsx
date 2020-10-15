import React, { useState, Fragment } from 'react';
import {
  Grid,
  Breadcrumb,
  Segment,
  List,
  Button,
  Table,
  Icon,
} from 'semantic-ui-react';
import { Link, useParams, NavLink } from 'react-router-dom';
import formatMoney from '../../../app/utils/formatMoney';
import { useEffect } from 'react';
import axios from 'axios';
import PricesChartComponent from './PricesChartComponent';
import authHeader from '../../../app/auth/auth-header';

const ReadMarchePage = () => {
  let { id } = useParams();

  const [marche, setMarche] = useState({});

  const {
    libelle_production,
    libelle_produit,
    type_marche,
    localisation,
    unite,
    prix_january,
    prix_february,
    prix_march,
    prix_april,
    prix_may,
    prix_june,
    prix_july,
    prix_august,
    prix_september,
    prix_october,
    prix_november,
    prix_december,
  } = marche;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}/marche/${id}`, { headers: authHeader()}
      );
      setMarche(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to='/marches'>Marchés</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Marché {id}</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={10}>
          <PricesChartComponent marche={marche} />
          <h5>Tableaux des prix </h5>
          <Table fixed>
            <Table.Header>
              <Table.HeaderCell>Janvier</Table.HeaderCell>
              <Table.HeaderCell>Février</Table.HeaderCell>
              <Table.HeaderCell>Mars</Table.HeaderCell>
              <Table.HeaderCell>Avril</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {prix_january && (
                    <Fragment>
                      {formatMoney(prix_january, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {prix_february && (
                    <Fragment>
                      {formatMoney(prix_february, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {prix_march && (
                    <Fragment>
                      {formatMoney(prix_march, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {prix_april && (
                    <Fragment>
                      {formatMoney(prix_april, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table fixed>
            <Table.Header>
              <Table.HeaderCell>Mai</Table.HeaderCell>
              <Table.HeaderCell>Juin</Table.HeaderCell>
              <Table.HeaderCell>Juillet</Table.HeaderCell>
              <Table.HeaderCell>Août</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {prix_may && (
                    <Fragment>
                      {formatMoney(prix_may, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {prix_june && (
                    <Fragment>
                      {formatMoney(prix_june, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {prix_july && (
                    <Fragment>
                      {formatMoney(prix_july, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {prix_august && (
                    <Fragment>
                      {formatMoney(prix_august, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table fixed>
            <Table.Header>
              <Table.HeaderCell>Septembre</Table.HeaderCell>
              <Table.HeaderCell>Octobre</Table.HeaderCell>
              <Table.HeaderCell>Novembre</Table.HeaderCell>
              <Table.HeaderCell>Décembre</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {prix_september && (
                    <Fragment>
                      {formatMoney(prix_september, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {prix_october && (
                    <Fragment>
                      {formatMoney(prix_october, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {prix_november && (
                    <Fragment>
                      {formatMoney(prix_november, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {prix_december && (
                    <Fragment>
                      {formatMoney(prix_december, 2)}/{unite}
                    </Fragment>
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button color='blue' as={NavLink} to={`/marche/${id}/update`}>
            Mettre les prix à jour
          </Button>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Informations sur le marché</h5>
            </Segment>
            <Segment attached='bottom'>
              <List>
                <List.Item>
                  <Icon name='tag' /> {libelle_production}
                </List.Item>
              </List>
              <List>
                <List.Item>
                  <Icon name='tags' /> {libelle_produit}
                </List.Item>
              </List>
              <List>
                <List.Item>
                  <Icon name='money' /> {type_marche}
                </List.Item>
              </List>
              <List>
                <List.Item>
                  <Icon name='map marker alternate' /> {localisation}
                </List.Item>
              </List>
              {/* <Button>Modifier</Button> */}
            </Segment>
          </Segment.Group>
          <Button
            negative
            floated='right'
            as={Link}
            to={`/marche/${id}/delete`}
          >
            Supprimer
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadMarchePage;
