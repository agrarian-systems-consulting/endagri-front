import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const DeleteMarchePage = () => {
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
              onClick={() => {
                // TODO : Supprimer la fiche
                // await axios.delete
                addToast('Le marché a bien été supprimé', {
                  appearance: 'success',
                  autoDismiss: true,
                });

                history.push(`/marches`);
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

export default DeleteMarchePage;
