import React, { Fragment } from 'react';
import {
  Grid,
  List,
  Label,
  Card,
  Icon,
  Button,
  Transition,
  Header,
  Segment,
  Table,
} from 'semantic-ui-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { NavLink, useParams } from 'react-router-dom';
import capitalize from '../../../app/utils/capitalize';
import CulturesComponent from './CulturesComponent';
import ElevagesComponent from './ElevagesComponent';
import { findByTitle } from '@testing-library/react';
const ProductionsComponent = ({ fichesLibres, deleteFicheTechniqueLibre }) => {
  const { id } = useParams();
  return (
    <Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as='h5'>Cultures</Header>
        </Grid.Column>
      </Grid.Row>
      <CulturesComponent
        fichesLibres={fichesLibres.filter((fl) =>
          ['Culture annuelle', 'Culture pérenne'].includes(fl.type_production)
        )}
        analyse_id={id}
        deleteFicheTechniqueLibre={deleteFicheTechniqueLibre}
      />
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as='h5'>Elevages</Header>
        </Grid.Column>
      </Grid.Row>
      <ElevagesComponent
        fichesLibres={fichesLibres.filter((fl) =>
          [
            'Elevage bovin laitier',
            'Elevage ovin engraisseur',
            'Elevage ovin naisseur-engraisseur',
            'Elevage apicole',
          ].includes(fl.type_production)
        )}
        analyse_id={id}
        deleteFicheTechniqueLibre={deleteFicheTechniqueLibre}
      />
    </Fragment>
  );
};

export default ProductionsComponent;
