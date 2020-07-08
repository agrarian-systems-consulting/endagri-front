import React from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Grid, Segment } from 'semantic-ui-react';

const DeleteFichePage = () => {
  const { addToast } = useToasts();
  let history = useHistory();
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment>
            <p>Cette action est irréversible, si vous cliquez sur supprimer.</p>
            <Button
              onClick={() => {
                // TODO : Supprimer la fiche
                // await axios.delete
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
              color='red'
              onClick={() => {
                // TODO : Supprimer la fiche
                // await axios.delete
                addToast('La fiche a bien été supprimée', {
                  appearance: 'success',
                  autoDismiss: true,
                });

                history.push(`/fiches`);
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

export default DeleteFichePage;
