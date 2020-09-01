import React from 'react';
import { Grid, Segment, Button, Breadcrumb } from 'semantic-ui-react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Axios from 'axios';
const DeleteAnalysePage = () => {
  let history = useHistory();
  const { addToast } = useToasts();
  let { id } = useParams();

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/analyses'>Analyses</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section>
              <NavLink to={`/analyse/${id}`}>Analyse {id}</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Supprimer</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Supprimer une fiche</h5>
            </Segment>
            <Segment attached='bottom'>
              <p>
                Cette action est irréversible, l'analyse sera supprimée de façon
                définitive.
              </p>
              <Button
                onClick={() => {
                  history.goBack();
                }}
              >
                Annuler
              </Button>
              <Button
                floated='right'
                color='red'
                onClick={() => {
                  Axios.delete(`http://localhost:3333/analyse/${id}`)
                    .then((res) => {
                      addToast("L'analyse a bien été supprimée", {
                        appearance: 'success',
                        autoDismiss: true,
                      });

                      history.push(`/analyses`);
                    })
                    .catch((err) => {
                      console.log(err);
                      addToast("Problème lors de la suppression de l'analye", {
                        appearance: 'error',
                        autoDismiss: true,
                      });
                    });
                }}
              >
                Supprimer
              </Button>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DeleteAnalysePage;
