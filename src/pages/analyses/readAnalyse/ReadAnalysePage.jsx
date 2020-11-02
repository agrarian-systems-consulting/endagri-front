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
  Header,
  Segment,
  Icon,
  Message,
} from 'semantic-ui-react';
import FicheLibreFormComponent from './FicheLibreFormComponent';
import DepenseLibreFormComponent from './DepenseLibreFormComponent';
import InformationsPrincipalesComponent from './InformationsPrincipalesComponent';
import ProductionsComponent from './ProductionsComponent';
import DepensesLibresComponent from './DepensesLibresComponent';
import authHeader from '../../../app/auth/auth-header';
import useUser from '../../../app/auth/useUser';

const ReadAnalysePage = () => {
  const { id } = useParams();
  const { addToast } = useToasts();
  const { utilisateur } = useUser();
  const [loading, setLoading] = useState(true);
  const [analyse, setAnalyse] = useState();
  const [
    isOpenFicheTechniqueLibreForm,
    setIsOpenFicheTechniqueLibreForm,
  ] = useState(false);
  const [isOpenDepenseLibreForm, setIsOpenDepenseLibreForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      Axios.get(`${process.env.REACT_APP_API_URI}/analyse/${id}`, {
        headers: authHeader(),
      })
        .then((res) => {
          setAnalyse(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchData();
  }, [id]);

  const addFicheTechniqueLibre = (ficheTechniqueLibre) => {
    Axios.post(
      `${process.env.REACT_APP_API_URI}/analyse/${id}/fiche-technique-libre`,
      ficheTechniqueLibre,
      { headers: authHeader() }
    )
      .then((res) => {
        addToast('La production a bien été ajoutée', {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedAnalyse = update(analyse, {
          fiches_techniques_libres: {
            $push: [res.data],
          },
        });

        setAnalyse(updatedAnalyse);

        setIsOpenFicheTechniqueLibreForm(false);
      })
      .catch((err) => {
        console.log(err);
        addToast('Erreur lors de la création de la production', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const deleteFicheTechniqueLibre = (id_ftl) => {
    Axios.delete(
      `${process.env.REACT_APP_API_URI}/analyse/${id}/fiche-technique-libre/${id_ftl}`,
      { headers: authHeader() }
    )
      .then((res) => {
        addToast('La production a bien été supprimée', {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedAnalyse = update(analyse, {
          fiches_techniques_libres: {
            $apply: (fiches_techniques_libres) =>
              fiches_techniques_libres.filter((ftl) => {
                return ftl.id !== id_ftl;
              }),
          },
        });

        setAnalyse(updatedAnalyse);
      })
      .catch((err) => {
        console.log(err);
        addToast('Erreur lors de la suppression de la production', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const addDepenseLibre = (depenseLibre) => {
    Axios.post(
      `${process.env.REACT_APP_API_URI}/analyse/${id}/depense_libre`,
      depenseLibre,
      { headers: authHeader() }
    )
      .then((res) => {
        addToast('La dépense a bien été ajoutée', {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedAnalyse = update(analyse, {
          depenses_libres: {
            $push: [res.data],
          },
        });

        setAnalyse(updatedAnalyse);

        setIsOpenDepenseLibreForm(false);
      })
      .catch((err) => {
        console.log(err);
        addToast('Erreur lors de la création de la dépense', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const deleteDepenseLibre = (id_depense_libre) => {
    Axios.delete(
      `${process.env.REACT_APP_API_URI}/analyse/${id}/depense_libre/${id_depense_libre}`,
      { headers: authHeader() }
    )
      .then((res) => {
        addToast('La dépense libre a bien été supprimée', {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedAnalyse = update(analyse, {
          depenses_libres: {
            $apply: (depenses_libres) =>
              depenses_libres.filter((depense_libre) => {
                return depense_libre.id !== id_depense_libre;
              }),
          },
        });

        setAnalyse(updatedAnalyse);
      })
      .catch((err) => {
        console.log(err);
        addToast('Erreur lors de la suppression de la dépense libre', {
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
              <NavLink to='/analyses'>Analyses</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Analyse {id}</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      {loading ? (
        <Message>Chargement en cours...</Message>
      ) : (
        <Fragment>
          <InformationsPrincipalesComponent info={analyse} />
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='leaf' />
              Productions
            </Header>
          </Divider>
          <ProductionsComponent
            fichesLibres={analyse.fiches_techniques_libres}
            deleteFicheTechniqueLibre={deleteFicheTechniqueLibre}
          />
          <Grid.Row>
            <Grid.Column width={8}>
              {isOpenFicheTechniqueLibreForm ? (
                <Fragment>
                  <Button
                    onClick={() => {
                      setIsOpenFicheTechniqueLibreForm(false);
                    }}
                  >
                    Fermer{' '}
                  </Button>
                  <Segment>
                    <FicheLibreFormComponent
                      addFicheTechniqueLibre={addFicheTechniqueLibre}
                    />
                  </Segment>
                </Fragment>
              ) : (
                <Button
                  color='teal'
                  onClick={() => {
                    setIsOpenFicheTechniqueLibreForm(true);
                  }}
                >
                  Ajouter une production
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='money' />
              Dépenses libres
            </Header>
          </Divider>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h5'>Dépenses libres</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <DepensesLibresComponent
              depenses_libres={analyse.depenses_libres}
              deleteDepenseLibre={deleteDepenseLibre}
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              {isOpenDepenseLibreForm ? (
                <Fragment>
                  <Button
                    onClick={() => {
                      setIsOpenDepenseLibreForm(false);
                    }}
                  >
                    Fermer{' '}
                  </Button>
                  <Segment>
                    <DepenseLibreFormComponent
                      addDepenseLibre={addDepenseLibre}
                    />
                  </Segment>
                </Fragment>
              ) : (
                <Button
                  color='teal'
                  onClick={() => {
                    setIsOpenDepenseLibreForm(true);
                  }}
                >
                  Ajouter une dépense libre
                </Button>
              )}{' '}
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      )}
      {/* <pre>{JSON.stringify(analyse, true, 2)}</pre> */}
      <Grid.Row>
        <Grid.Column width={16}>
          {['SUPER_ADMIN', 'ADMINISTRATEUR_ENDAGRI'].includes(
            utilisateur.role
          ) && (
            <Fragment>
              <Divider horizontal>
                <Header as='h4'>
                  <Icon name='setting' />
                  Zone administrateur
                </Header>
              </Divider>
              <Button
                color='red'
                floated='right'
                as={NavLink}
                to={`/analyse/${id}/delete`}
              >
                Supprimer l'analyse
              </Button>
            </Fragment>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadAnalysePage;
