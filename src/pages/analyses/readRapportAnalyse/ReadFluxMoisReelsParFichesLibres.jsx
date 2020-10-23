import React, { useState, useEffect, Fragment } from 'react';
import {
  Breadcrumb,
  Button,
  Grid,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';
import { NavLink, useParams } from 'react-router-dom';
import Axios from 'axios';
import FluxChartComponent from './FluxChartComponent';
import formatMoney from '../../../app/utils/formatMoney';
import parse from 'date-fns/parse';
import authHeader from '../../../app/auth/auth-header';
import FluxTableComponent from './FluxTableComponent';

const ReadFluxMoisReelsParFichesLibres = () => {
  let { id } = useParams();

  const [flux, setFlux] = useState([]);
  const [view, setView] = useState('chart');

  useEffect(() => {
    Axios(
      `${process.env.REACT_APP_API_URI}/analyse/${id}/flux_mois_reels_par_fiches_libres`,
      { headers: authHeader() }
    ).then((res) => {
      setFlux(res.data);
    });
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/analyses'>Analyses</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Analyse {id}</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Button.Group floated='right'>
            <Button
              icon
              color='blue'
              active={view === 'chart'}
              onClick={() => setView('chart')}
            >
              <Icon name='chart bar' />
            </Button>
            <Button
              icon
              color='blue'
              active={view === 'table'}
              onClick={() => setView('table')}
            >
              <Icon name='table' />
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      {view === 'chart' && (
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment.Group>
              <Segment attached='top'>
                <h4>Graphe des flux de trésorerie</h4>
              </Segment>
              <Segment attached='bottom'>
                <FluxChartComponent data={flux} />
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      )}
      {view === 'table' && (
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment.Group>
              <Segment attached='top'>
                <h4>Tableau des flux de trésorerie</h4>
              </Segment>
              <Segment attached='bottom'>
                <FluxTableComponent flux={flux} />
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      )}
      {/* <pre>{JSON.stringify(flux, true, 2)}</pre> */}
    </Grid>
  );
};

export default ReadFluxMoisReelsParFichesLibres;
