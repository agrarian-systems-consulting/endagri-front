import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Grid,
  Icon,
  Input,
  Menu,
  Message,
  Table,
} from 'semantic-ui-react';
import Axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import capitalize from '../../../app/utils/capitalize';
import authHeader from '../../../app/auth/auth-header';
import useUser from '../../../app/auth/useUser';

const ListAnalysesPage = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [authored, setAuthored] = useState(true);
  const { utilisateur } = useUser();
  useEffect(() => {
    const fetchData = () => {
      Axios(`${process.env.REACT_APP_API_URI}/analyses`, {
        headers: authHeader(),
      })
        .then((res) => {
          setAnalyses(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  // Methode pour filtrer les analyses
  const filteredAnalyses = () => {
    // Spread previous state
    let filteredAnalyses = [...analyses];

    // Filter with search bar value
    if (search !== '') {
      filteredAnalyses = filteredAnalyses.filter(
        (project) =>
          project.nom_utilisateur
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          project.nom_client.toLowerCase().includes(search.toLowerCase()) ||
          project.id == search.toLowerCase()
      );
    }

    // Filter with category
    if (authored) {
      filteredAnalyses = filteredAnalyses.filter(
        (project) =>
          project.nom_utilisateur.toLowerCase() ==
          utilisateur.matricule.toLowerCase()
      );
    }

    return filteredAnalyses;
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Breadcrumb>
            <Breadcrumb.Section active>Analyses</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button
            color='teal'
            floated='right'
            as={NavLink}
            to='/analyse/create'
          >
            Nouvelle analyse
          </Button>
        </Grid.Column>
      </Grid.Row>
      {loading ? (
        <Message>Chargement en cours</Message>
      ) : (
        <Grid.Row>
          <Grid.Column width={4}>
            <Menu vertical fluid>
              <Menu.Item>
                <Input
                  placeholder='Recherche...'
                  className='icon'
                  icon='search'
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Menu.Item>
              <Menu.Item
                active={!authored}
                onClick={(e) => {
                  setAuthored(false);
                  setSearch('');
                }}
              >
                Toutes les analyses
                {!authored && <Icon name='filter' />}
              </Menu.Item>
              <Menu.Item
                active={authored}
                onClick={(e) => {
                  setAuthored(true);
                  setSearch('');
                }}
              >
                Mes analyses
                {authored && <Icon name='filter' />}
              </Menu.Item>
            </Menu>
          </Grid.Column>

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
                {filteredAnalyses().map(
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
      )}
    </Grid>
  );
};

export default ListAnalysesPage;
