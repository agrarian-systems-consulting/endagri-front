import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Table } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import FluxChartComponent from './FluxChartComponent';
import formatMoney from '../../../app/utils/formatMoney';
import parse from 'date-fns/parse';
import authHeader from '../../../app/auth/auth-header';

const ReadFluxMoisReelsParFichesLibres = () => {
  let { id } = useParams();

  const [flux, setFlux] = useState([]);

  useEffect(() => {
    Axios(
      `${process.env.REACT_APP_API_URI}/analyse/${id}/flux_mois_reels_par_fiches_libres`, { headers: authHeader()}
    ).then((res) => {
      setFlux(res.data);
    });
  }, []);

  return (
    <Fragment>
      <Segment>
        <h5>Flux de trésorerie</h5>
        <FluxChartComponent data={flux} />
      </Segment>
      <Segment>
        <h5>Résumé</h5>
        <Table fixed selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Mois</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Dépenses</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Ventes</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Solde</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Trésorerie</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {flux.map(
              ({ mois, total_depenses, total_ventes, solde, solde_cumule }) => {
                return (
                  <Table.Row>
                    <Table.Cell>{mois}</Table.Cell>
                    <Table.Cell textAlign='right'>
                      {formatMoney(total_depenses)}
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                      {formatMoney(total_ventes)}
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                      {formatMoney(solde)}
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                      {formatMoney(solde_cumule)}
                    </Table.Cell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
        {/* <pre>{JSON.stringify(flux, true, 2)}</pre> */}
      </Segment>
    </Fragment>
  );
};

export default ReadFluxMoisReelsParFichesLibres;
