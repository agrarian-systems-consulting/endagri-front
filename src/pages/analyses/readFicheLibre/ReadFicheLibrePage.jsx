import Axios from 'axios';
import update from 'immutability-helper';
import React, { Fragment, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import {
  Breadcrumb,
  Button,
  Divider,
  Grid,
  Label,
  List,
  Placeholder,
  Segment,
  Table,
  Transition,
  Icon,
} from 'semantic-ui-react';
import authHeader from '../../../app/auth/auth-header';
import CoeffDepenseFormComponent from './CoeffDepenseFormComponent';
import CoeffVenteFormComponent from './CoeffVenteFormComponent';

const ReadFicheLibrePage = () => {
  const { id, id_ftl } = useParams();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [ficheLibre, setFicheLibre] = useState({});
  const [isOpenCoeffDepenseForm, setIsOpenCoeffDepenseForm] = useState(false);
  const [isOpenCoeffVenteForm, setIsOpenCoeffVenteForm] = useState(false);
  const {
    id_fiche_technique,
    id_analyse,
    date_ini,
    coeff_surface_ou_nombre_animaux,
    coeff_main_oeuvre_familiale,
    libelle_fiche_technique,
    libelle_production,
    type_production,
    coeff_depenses,
    coeff_ventes,
  } = ficheLibre;

  useEffect(() => {
    const fetchData = async () => {
      Axios(
        `${process.env.REACT_APP_API_URI}/analyse/${id}/fiche-technique-libre/${id_ftl}`,
        { headers: authHeader() }
      )
        .then((res) => {
          console.log(res.data);
          setFicheLibre(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [id, id_ftl]);

  const addCoeffDepense = (coeff_depense) => {
    coeff_depense.id_fiche_technique_libre = id_ftl;
    Axios.post(
      `${process.env.REACT_APP_API_URI}/coeff_depense`,
      coeff_depense,
      { headers: authHeader() }
    )
      .then((res) => {
        addToast('Le coefficient a bien été ajouté', {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedFicheLibre = update(ficheLibre, {
          coeff_depenses: {
            $push: [res.data],
          },
        });

        setFicheLibre(updatedFicheLibre);

        setIsOpenCoeffDepenseForm(false);
      })
      .catch((err) => {
        console.log(err);
        addToast("Erreur lors de l'ajout du coefficient", {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const deleteCoeffDepense = (id) => {
    Axios.delete(`${process.env.REACT_APP_API_URI}/coeff_depense/${id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        addToast('Le coefficient a bien été supprimé', {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedFicheLibre = update(ficheLibre, {
          coeff_depenses: {
            $apply: (coeff_depenses) =>
              coeff_depenses.filter((coeff) => {
                return coeff.id !== id;
              }),
          },
        });

        setFicheLibre(updatedFicheLibre);
      })
      .catch((err) => {
        console.log(err);
        addToast('Erreur lors de la suppression du coefficient', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const addCoeffVente = (coeff_vente) => {
    coeff_vente.id_fiche_technique_libre = id_ftl;
    Axios.post(`${process.env.REACT_APP_API_URI}/coeff_vente`, coeff_vente, {
      headers: authHeader(),
    })
      .then((res) => {
        addToast('Le coefficient a bien été ajouté', {
          appearance: 'success',
          autoDismiss: true,
        });

        console.log('Réponse :' + res.data);

        let updatedFicheLibre = update(ficheLibre, {
          coeff_ventes: {
            $push: [res.data],
          },
        });

        setFicheLibre(updatedFicheLibre);

        setIsOpenCoeffVenteForm(false);
      })
      .catch((err) => {
        console.log(err);
        addToast("Erreur lors de l'ajout du coefficient", {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const deleteCoeffVente = (id) => {
    Axios.delete(`${process.env.REACT_APP_API_URI}/coeff_vente/${id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        addToast('Le coefficient a bien été supprimé', {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedFicheLibre = update(ficheLibre, {
          coeff_ventes: {
            $apply: (coeff_ventes) =>
              coeff_ventes.filter((coeff) => {
                return coeff.id !== id;
              }),
          },
        });

        setFicheLibre(updatedFicheLibre);
      })
      .catch((err) => {
        console.log(err);
        addToast('Erreur lors de la suppression du coefficient', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/analyses'>Analyse</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section>
              <NavLink to={`/analyse/${id}`}>Analyse {id}</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Fiche technique libre {id_ftl}
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={10}>
          {loading ? (
            <Segment.Group>
              <Segment attached='top'>
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </Segment>
              <Segment clearing attached='bottom'>
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              </Segment>
            </Segment.Group>
          ) : (
            <Fragment>
              <Segment.Group>
                <Segment attached='top'>
                  <h5> {ficheLibre.libelle_fiche_technique}</h5>
                </Segment>
                <Segment clearing attached='bottom'>
                  <Label>{type_production}</Label>
                  <List>
                    {
                      {
                        'Culture annuelle': (
                          <List.Item>
                            <b>Surface</b> {coeff_surface_ou_nombre_animaux} ha
                          </List.Item>
                        ),
                        'Culture pérenne': (
                          <List.Item>
                            <b>Surface</b> {coeff_surface_ou_nombre_animaux} ha
                          </List.Item>
                        ),
                        'Elevage bovin laitier': (
                          <List.Item>
                            <b>Nombre d'animaux</b>{' '}
                            {coeff_surface_ou_nombre_animaux}
                          </List.Item>
                        ),
                        'Elevage ovin engraisseur': (
                          <List.Item>
                            <b>Nombre d'animaux</b>{' '}
                            {coeff_surface_ou_nombre_animaux}
                          </List.Item>
                        ),
                        'Elevage ovin naisseur-engraisseur': (
                          <List.Item>
                            <b>Nombre d'animaux</b>{' '}
                            {coeff_surface_ou_nombre_animaux}
                          </List.Item>
                        ),
                        'Elevage apicole': (
                          <List.Item>
                            <b>Nombre de ruches</b>{' '}
                            {coeff_surface_ou_nombre_animaux}
                          </List.Item>
                        ),
                      }[type_production]
                    }
                    <List.Item>
                      <b>
                        Part du temps de travail réalisé par la main d'oeuvre
                        familiale
                      </b>{' '}
                      {coeff_main_oeuvre_familiale * 100} %
                    </List.Item>
                    {
                      {
                        'Culture annuelle': (
                          <List.Item>
                            <b>Date de semis</b> {date_ini}
                          </List.Item>
                        ),
                        'Elevage bovin laitier': (
                          <List.Item>
                            <b>Date de mise-bas</b> {date_ini}
                          </List.Item>
                        ),
                        'Elevage ovin engraisseur': (
                          <List.Item>
                            <b>Date de mise-bas</b> {date_ini}
                          </List.Item>
                        ),
                        'Elevage ovin naisseur-engraisseur': (
                          <List.Item>
                            <b>Date de mise-bas</b> {date_ini}
                          </List.Item>
                        ),
                      }[type_production]
                    }
                  </List>
                </Segment>
              </Segment.Group>
            </Fragment>
          )}

          {loading ? (
            <Segment.Group>
              <Segment attached='top'>
                <h5>Modulation des dépenses</h5>
              </Segment>
              <Segment clearing attached='bottom'>
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
                <Divider />
                <Button color='teal' disabled>
                  Ajouter
                </Button>
              </Segment>
            </Segment.Group>
          ) : (
            <Fragment>
              <Segment.Group>
                <Segment attached='top'>
                  <h5>Modulation des dépenses</h5>
                </Segment>
                <Segment clearing attached='bottom'>
                  {coeff_depenses.length > 0 ? (
                    <Table fixed>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Catégorie</Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>
                            Part d'autoproduction
                          </Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Transition.Group as={Table.Body}>
                        {coeff_depenses.map((coeff) => {
                          return (
                            <Table.Row>
                              <Table.Cell>{coeff.libelle_categorie}</Table.Cell>
                              <Table.Cell textAlign='center'>
                                {coeff.coeff_intraconsommation * 100} %
                              </Table.Cell>
                              <Table.Cell textAlign='center'>
                                <Button
                                  onClick={() => {
                                    deleteCoeffDepense(coeff.id);
                                  }}
                                  size='mini'
                                  icon
                                  basic
                                  circular
                                  floated='right'
                                >
                                  <Icon name='trash' />
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Transition.Group>
                    </Table>
                  ) : (
                    <p>
                      Il n'y a pas encore de coefficients pour moduler les
                      dépenses
                    </p>
                  )}

                  {isOpenCoeffDepenseForm ? (
                    <Fragment>
                      <Button
                        onClick={() => {
                          setIsOpenCoeffDepenseForm(false);
                        }}
                      >
                        Fermer
                      </Button>
                      <Divider></Divider>
                      <CoeffDepenseFormComponent
                        addCoeffDepense={addCoeffDepense}
                      />
                    </Fragment>
                  ) : (
                    <Button
                      color='teal'
                      onClick={() => {
                        setIsOpenCoeffDepenseForm(true);
                      }}
                    >
                      Ajouter
                    </Button>
                  )}
                </Segment>
              </Segment.Group>
            </Fragment>
          )}

          {loading ? (
            <Segment.Group>
              <Segment attached='top'>
                <h5>Modulation des ventes</h5>
              </Segment>
              <Segment clearing attached='bottom'>
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
                <Divider />
                <Button color='teal' disabled>
                  Ajouter
                </Button>
              </Segment>
            </Segment.Group>
          ) : (
            <Fragment>
              <Segment.Group>
                <Segment attached='top'>
                  <h5>Modulation des ventes</h5>
                </Segment>
                <Segment clearing attached='bottom'>
                  {coeff_ventes.length > 0 ? (
                    <Table>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Catégorie</Table.HeaderCell>
                          {/* <Table.HeaderCell textAlign='center'>
                            Part utilisée sur l'exploitation
                          </Table.HeaderCell> */}
                          <Table.HeaderCell textAlign='center'>
                            Part autoconsommée
                          </Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>
                            Coefficient rendement
                          </Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Transition.Group as={Table.Body}>
                        {coeff_ventes.map((coeff) => {
                          return (
                            <Table.Row key={coeff.id}>
                              <Table.Cell>
                                {coeff.libelle} - {coeff.type_marche} -{' '}
                                {coeff.localisation}
                              </Table.Cell>
                              {/* <Table.Cell textAlign='center'>
                                {coeff.coeff_intraconsommation * 100} %
                              </Table.Cell> */}
                              <Table.Cell textAlign='center'>
                                {coeff.coeff_autoconsommation * 100} %
                              </Table.Cell>
                              <Table.Cell textAlign='center'>
                                {parseFloat(
                                  coeff.coeff_rendement * 100
                                ).toFixed(0)}{' '}
                                % du rdt. moyen
                              </Table.Cell>
                              <Table.Cell textAlign='center'>
                                <Button
                                  onClick={() => {
                                    deleteCoeffVente(coeff.id);
                                  }}
                                  size='mini'
                                  icon
                                  basic
                                  circular
                                  floated='right'
                                >
                                  <Icon name='trash' />
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Transition.Group>
                    </Table>
                  ) : (
                    <p>
                      Il n'y a pas encore de coefficients pour moduler les
                      ventes
                    </p>
                  )}

                  {isOpenCoeffVenteForm ? (
                    <Fragment>
                      <Button
                        onClick={() => {
                          setIsOpenCoeffVenteForm(false);
                        }}
                      >
                        Fermer
                      </Button>
                      <Divider></Divider>
                      <CoeffVenteFormComponent addCoeffVente={addCoeffVente} />
                    </Fragment>
                  ) : (
                    <Button
                      color='teal'
                      onClick={() => {
                        setIsOpenCoeffVenteForm(true);
                      }}
                    >
                      Ajouter
                    </Button>
                  )}

                  {/* <pre>values = {JSON.stringify(coeff_ventes, null, 2)}</pre> */}
                </Segment>
              </Segment.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid.Row>
      {/* <pre>{JSON.stringify(ficheLibre, true, 2)}</pre> */}
    </Grid>
  );
};

export default ReadFicheLibrePage;
