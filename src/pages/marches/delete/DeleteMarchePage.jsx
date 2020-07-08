import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { NavLink, Link, useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Axios from 'axios';

const DeleteMarchePage = () => {
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
                Axios.delete(`http://localhost:3333/marche/${id}`)
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DeleteMarchePage;
