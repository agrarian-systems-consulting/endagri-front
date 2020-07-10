import React, { useState, Fragment } from 'react';
import {
  Grid,
  Breadcrumb,
  Segment,
  Header,
  Button,
  Divider,
} from 'semantic-ui-react';
import { NavLink, useParams } from 'react-router-dom';
import InformationsPrincipalesComponent from './InformationsPrincipalesComponent';
import ProductionsComponent from './ProductionsComponent';
import { useEffect } from 'react';
import Axios from 'axios';
import FicheLibreFormComponent from './FicheLibreFormComponent';
import { useToasts } from 'react-toast-notifications';

const ReadAnalysePage = () => {
  const { id } = useParams();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [analyse, setAnalyse] = useState();

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
              <Button color='teal'>Ajouter une production</Button>
              <Segment>
                <FicheLibreFormComponent
                  addFicheTechniqueLibre={addFicheTechniqueLibre}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Divider />

          <Grid.Column width={16}>
            <Header as='h5'>Dépenses libres</Header>
          </Grid.Column>
        </Fragment>
      )}
      <pre>{JSON.stringify(analyse, true, 2)}</pre>
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
