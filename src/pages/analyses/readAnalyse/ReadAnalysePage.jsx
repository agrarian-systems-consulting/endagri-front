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
} from 'semantic-ui-react';
import FicheLibreFormComponent from './FicheLibreFormComponent';
import InformationsPrincipalesComponent from './InformationsPrincipalesComponent';
import ProductionsComponent from './ProductionsComponent';

const ReadAnalysePage = () => {
  const { id } = useParams();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [analyse, setAnalyse] = useState();
  const [
    isOpenFicheTechniqueLibreForm,
    setIsOpenFicheTechniqueLibreForm,
  ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      Axios.get(`http://localhost:3333/analyse/${id}`)
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
      `http://localhost:3333/analyse/${id}/fiche-technique-libre`,
      ficheTechniqueLibre
    )
      .then((res) => {
        addToast('La fiche a bien été créée', {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedAnalyse = update(analyse, {
          fiches_techniques_libres: {
            $push: [res.data],
          },
        });

        setAnalyse(updatedAnalyse);
      })
      .catch((err) => {
        console.log(err);
        addToast("Erreur lors de la création de l'analyse", {
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
            <Breadcrumb.Section active>Analyse 1</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      {loading ? (
        <Fragment>Chargement en cours...</Fragment>
      ) : (
        <Fragment>
          <InformationsPrincipalesComponent info={analyse} />
          <Divider />
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h5'>Productions</Header>
            </Grid.Column>
          </Grid.Row>
          <ProductionsComponent
            fichesLibres={analyse.fiches_techniques_libres}
          />
          <Grid.Row>
            <Grid.Column width={16}>
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
          <Divider />

          <Grid.Column width={16}>
            <Header as='h5'>Dépenses libres</Header>
          </Grid.Column>
        </Fragment>
      )}
      {/* <pre>{JSON.stringify(analyse, true, 2)}</pre> */}
      <Grid.Row>
        <Grid.Column width={16}>
          <Button color='red' as={NavLink} to={`/analyse/${id}/delete`}>
            Supprimer l'analyse
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadAnalysePage;
