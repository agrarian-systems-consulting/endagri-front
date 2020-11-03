import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Grid, Segment } from 'semantic-ui-react';
import Axios from 'axios';
import authHeader from '../../../app/auth/auth-header';

const DeleteUtilisateurPage = () => {
  const { addToast } = useToasts();
  let { matricule } = useParams();
  let history = useHistory();
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Supprimer un utilisateur</h5>
            </Segment>
            <Segment attached='bottom'>
              <p>
                Cette action est irréversible, si vous cliquez sur supprimer.
              </p>
              <Button
                onClick={() => {
                  addToast("L'utilisateur n'a pas été supprimé", {
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
                  Axios.delete(
                    `${process.env.REACT_APP_API_URI}/utilisateur/${matricule}`,
                    {
                      headers: authHeader(),
                    }
                  )
                    .then((res) => {
                      addToast("L'utilisateur a bien été supprimé", {
                        appearance: 'success',
                        autoDismiss: true,
                      });

                      history.push(`/utilisateurs`);
                    })
                    .catch((err) => {
                      console.log(err);
                      addToast(
                        "Problème lors de la suppression de l'utilisateur",
                        {
                          appearance: 'error',
                          autoDismiss: true,
                        }
                      );
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

export default DeleteUtilisateurPage;
