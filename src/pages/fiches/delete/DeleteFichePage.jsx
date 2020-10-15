import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Grid, Segment } from 'semantic-ui-react';
import Axios from 'axios';
import authHeader from '../../../app/auth/auth-header';

const DeleteFichePage = () => {
  const { addToast } = useToasts();
  let { id } = useParams();
  let history = useHistory();
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Supprimer une fiche</h5>
            </Segment>
            <Segment attached='bottom'>
              <p>
                Cette action est irréversible, si vous cliquez sur supprimer.
              </p>
              <Button
                onClick={() => {
                  addToast("La fiche n'a pas été supprimée", {
                    appearance: 'info',
                    autoDismiss: true,
                  });

                  history.goBack();
                }}
              >
                Annuler
              </Button>
              <Button
                floated='right'
                color='red'
                onClick={() => {
                  Axios.delete(`${process.env.REACT_APP_API_URI}/fiche/${id}`, {
                    headers: authHeader(),
                  })
                    .then((res) => {
                      addToast('La fiche a bien été supprimée', {
                        appearance: 'success',
                        autoDismiss: true,
                      });

                      history.push(`/fiches`);
                    })
                    .catch((err) => {
                      console.log(err);
                      addToast('Problème lors de la suppression de la fiche', {
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

export default DeleteFichePage;
