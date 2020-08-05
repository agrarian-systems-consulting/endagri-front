import Axios from 'axios';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Grid, Segment } from 'semantic-ui-react';

const DeleteMarchePage = () => {
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
              <h5>Supprimer un marché</h5>
            </Segment>
            <Segment attached='bottom'>
              <p>
                Cette action est irréversible, si vous cliquez sur supprimer.
              </p>
              <Button
                onClick={() => {
                  addToast("Le marché n'a pas été supprimé", {
                    appearance: 'info',
                    autoDismiss: true,
                  });

                  history.goBack();
                }}
              >
                Annuler
              </Button>
              <Button
                color='red'
                floated='right'
                onClick={() => {
                  Axios.delete(`http://51.210.14.158:3333/marche/${id}`)
                    .then(() => {
                      addToast('Le marché a bien été supprimé', {
                        appearance: 'success',
                        autoDismiss: true,
                      });

                      history.push(`/marches`);
                    })
                    .catch((err) => {
                      console.log(err);
                      addToast('Erreur lors de la suppression du marché', {
                        appearance: 'error',
                        autoDismiss: true,
                      });

                      history.push(`/marches`);
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

export default DeleteMarchePage;
