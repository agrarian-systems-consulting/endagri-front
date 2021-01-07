import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  Breadcrumb,
  Table,
  Button,
  Icon,
  Menu,
  Input,
  Message,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import capitalize from '../../../app/utils/capitalize';
import authHeader from '../../../app/auth/auth-header';
import useUser from '../../../app/auth/useUser';
import _ from 'lodash';

const ListFichesPage = () => {
  const [fiches, setFiches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { utilisateur } = useUser();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filterCategories = [
    'Culture annuelle',
    'Culture pérenne',
    'Elevage bovin laitier',
    'Elevage ovin engraisseur',
    'Elevage ovin naisseur-engraisseur',
    'Elevage apicole',
  ];

  // Method to filter projects
  const filteredFiches = () => {
    // Spread previous state
    let filteredFiches = [...fiches];

    // Filter with search bar value
    if (search !== '') {
      filteredFiches = filteredFiches.filter(
        (project) =>
          project.libelle.toLowerCase().includes(search.toLowerCase()) ||
          project.libelle_production
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    // Filter with selected category
    if (filterCategory !== '') {
      filteredFiches = filteredFiches.filter(
        (fiche) =>
          fiche.type_production &&
          fiche.type_production
            .replace(/,/g, ' ')
            .toLowerCase()
            .includes(filterCategory.toLowerCase())
      );
    }

    return filteredFiches;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`${process.env.REACT_APP_API_URI}/fiches`, {
        headers: authHeader(),
      });

      // Trier les fiches par ordre alphabétique
      const fichesOrdered = _.orderBy(res.data, ['libelle'], ['asc']);

      setFiches(fichesOrdered);
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
            <Grid.Column width={4}>
              <Menu vertical fluid>
                <Menu.Item>
                  <Input
                    placeholder='Libellé de la fiche...'
                    className='icon'
                    icon='search'
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Menu.Item>
                <Menu.Item
                  active={filterCategory === ''}
                  onClick={(e) => {
                    setFilterCategory('');
                    setSearch('');
                  }}
                >
                  Toutes les fiches
                  {filterCategory === '' && <Icon name='filter' />}
                </Menu.Item>

                {filterCategories.map((category, index) => {
                  return (
                    <Menu.Item
                      key={index}
                      active={filterCategory === category}
                      onClick={(e) => {
                        setFilterCategory(category);
                        setSearch('');
                      }}
                    >
                      {category}
                      {filterCategory === category && <Icon name='filter' />}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              {filteredFiches().length === 0 ? (
                <Message>Aucune analyse</Message>
              ) : (
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
                    {filteredFiches().map(
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
                              {[
                                'SUPER_ADMIN',
                                'ADMINISTRATEUR_ENDAGRI',
                              ].includes(utilisateur.role) && (
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
                              )}
                            </Table.Cell>
                          </Table.Row>
                        );
                      }
                    )}
                  </Table.Body>
                </Table>
              )}
            </Grid.Column>
          </Grid.Row>
          {/* <pre>{JSON.stringify(fiches, true, 2)}</pre> */}
        </Fragment>
      )}
    </Grid>
  );
};

export default ListFichesPage;
