import React, { useState, useEffect } from 'react';
import { Segment, Table } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const ReadFluxMoisReelsParFichesLibres = () => {
  let { id } = useParams();

  const [flux, setFlux] = useState([]);

  useEffect(() => {
    Axios(
      `http://localhost:3333/analyse/${id}/flux_mois_reels_par_fiches_libres`
    ).then((res) => {
      setFlux(res.data);
    });
  }, []);

  return (
    <Segment>
      <h5>Résumé</h5>
      Période d'analyse : Remettre ici Trésorerie initiale : 1500
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Mois</Table.HeaderCell>
            <Table.HeaderCell>Dépenses</Table.HeaderCell>
            <Table.HeaderCell>Ventes</Table.HeaderCell>
            <Table.HeaderCell>Solde</Table.HeaderCell>
            <Table.HeaderCell>Trésorerie</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {flux.map(
            ({ mois, total_depenses, total_ventes, solde, solde_cumule }) => {
              return (
                <Table.Row>
                  <Table.Cell>{mois}</Table.Cell>
                  <Table.Cell>{total_depenses}</Table.Cell>
                  <Table.Cell>{total_ventes}</Table.Cell>
                  <Table.Cell>{solde}</Table.Cell>
                  <Table.Cell>{solde_cumule}</Table.Cell>
                </Table.Row>
              );
            }
          )}
        </Table.Body>
      </Table>
      {/* <pre>{JSON.stringify(flux, true, 2)}</pre> */}
    </Segment>
  );
};

export default ReadFluxMoisReelsParFichesLibres;
