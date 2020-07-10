import React, { useEffect, Fragment } from 'react';
import {
  Grid,
  Breadcrumb,
  Segment,
  Placeholder,
  Label,
  List,
} from 'semantic-ui-react';
import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import CoeffDepenseFormComponent from './CoeffDepenseFormComponent';

const ReadFicheLibrePage = () => {
  const { id, id_ftl } = useParams();
  const [loading, setLoading] = useState(true);
  const [ficheLibre, setFicheLibre] = useState({});

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
    coeff_centes,
  } = ficheLibre;

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
                            <b>Date de semis</b>{' '}
                            {format(new Date(date_ini), 'dd MMMM yyyy', {
                              locale: fr,
                            })}{' '}
                          </List.Item>
                        ),
                        'Elevage bovin laitier': (
                          <List.Item>
                            <b>Date de mise-bas</b>{' '}
                            {format(new Date(date_ini), 'dd MMMM yyyy', {
                              locale: fr,
                            })}
                          </List.Item>
                        ),
                        'Elevage ovin engraisseur': (
                          <List.Item>
                            <b>Date de mise-bas</b>{' '}
                            {format(new Date(date_ini), 'dd MMMM yyyy', {
                              locale: fr,
                            })}
                          </List.Item>
                        ),
                        'Elevage ovin naisseur-engraisseur': (
                          <List.Item>
                            <b>Date de mise-bas</b>{' '}
                            {format(new Date(date_ini), 'dd MMMM yyyy', {
                              locale: fr,
                            })}
                          </List.Item>
                        ),
                      }[type_production]
                    }
                  </List>
                </Segment>
              </Segment.Group>
              <Segment.Group>
                <Segment>
                  <CoeffDepenseFormComponent />
                </Segment>
              </Segment.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadFicheLibrePage;
