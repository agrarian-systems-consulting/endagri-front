import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Breadcrumb, Grid, Segment } from 'semantic-ui-react';
import UpdateMarcheFormComponent from './UpdateMarcheFormComponent';

const UpdateMarchePage = () => {
  const { id } = useParams();
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/marches'>Marchés</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <NavLink to={`/marche/${id}`}>Marché {id}</NavLink>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Mettre à jour les prix
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={12}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Mettre à jour un marché</h5>
            </Segment>
            <Segment attached='bottom'>
              <UpdateMarcheFormComponent />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UpdateMarchePage;
