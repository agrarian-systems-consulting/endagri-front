import Axios from 'axios';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Grid, Segment } from 'semantic-ui-react';

const DeleteProductionPage = () => {
  const { addToast } = useToasts();
  let history = useHistory();
  let { id } = useParams();
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment>
            <p>Cette action est irréversible, si vous cliquez sur supprimer.</p>
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
              color='red'
              onClick={() => {
                Axios.delete(`http://localhost:3333/production/${id}`)
                  .then(() => {
                    addToast('La production a bien été supprimée', {
                      appearance: 'success',
                      autoDismiss: true,
                    });

                    history.push(`/productions`);
                  })
                  .catch((err) => {
                    console.log(err);
                    addToast('Erreur lors de la suppression de la production', {
                      appearance: 'error',
                      autoDismiss: true,
                    });

                    history.push(`/productions`);
                  });
              }}
            >
              Supprimer
            </Button>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DeleteProductionPage;
