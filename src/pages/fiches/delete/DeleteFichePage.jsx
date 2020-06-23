import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

const DeleteFichePage = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment>
            <p>Cette action est irréversible, si vous cliquez sur supprimer.</p>
            <Button as={Link} to='/fiches'>
              Annuler
            </Button>
            <Button
              color='red'
              onClick={() => {
                alert('Doit supprimer la fiche');
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
