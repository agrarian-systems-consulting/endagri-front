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
} from 'semantic-ui-react';
import CoeffDepenseFormComponent from './CoeffDepenseFormComponent';

const ReadFicheLibrePage = () => {
  const { id, id_ftl } = useParams();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [ficheLibre, setFicheLibre] = useState({});
  const [isOpenCoeffDepenseForm, setIsOpenCoeffDepenseForm] = useState(false);
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
        `http://localhost:3333/analyse/${id}/fiche-technique-libre/${id_ftl}`
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
    Axios.post(`http://localhost:3333/coeff_depense`, coeff_depense).then(
      (res) => {
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
      }
    );
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
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={8}>
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
              <Segment.Group>
                <Segment>
                  <h5>Modulation des dépenses</h5>
                  {coeff_depenses.length > 0 ? (
                    <Table fixed>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Catégorie</Table.HeaderCell>
                          <Table.HeaderCell>
                            Part d'autoproduction
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Transition.Group as={Table.Body}>
                        {coeff_depenses.map((coeff) => {
                          return (
                            <Table.Row>
                              <Table.Cell>{coeff.libelle_categorie}</Table.Cell>
                              <Table.Cell>
                                {coeff.coeff_intraconsommation}
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
        </Grid.Column>
      </Grid.Row>
      {/* <pre>{JSON.stringify(ficheLibre, true, 2)}</pre> */}
    </Grid>
  );
};

export default ReadFicheLibrePage;
