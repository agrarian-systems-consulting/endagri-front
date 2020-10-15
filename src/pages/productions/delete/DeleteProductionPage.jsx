import Axios from 'axios';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Grid, Segment } from 'semantic-ui-react';
import authHeader from '../../../app/auth/auth-header';

const DeleteProductionPage = () => {
  const { addToast } = useToasts();
  let history = useHistory();
  let { id } = useParams();
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Supprimer une production</h5>
            </Segment>
            <Segment attached='bottom'>
              <p>Cette action est irréversible.</p>
              <Button
                onClick={() => {
                  addToast(
                    "La production et ses produits n'ont pas été supprimés",
                    {
                      appearance: 'info',
                      autoDismiss: true,
                    }
                  );

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
                    `${process.env.REACT_APP_API_URI}/production/${id}`, { headers: authHeader()}
                  )
                    .then(() => {
                      addToast('La production a bien été supprimée', {
                        appearance: 'success',
                        autoDismiss: true,
                      });

                      history.push(`/productions`);
                    })
                    .catch((err) => {
                      console.log(err);
                      addToast(
                        'Erreur lors de la suppression de la production',
                        {
                          appearance: 'error',
                          autoDismiss: true,
                        }
                      );

                      history.push(`/productions`);
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

export default DeleteProductionPage;
