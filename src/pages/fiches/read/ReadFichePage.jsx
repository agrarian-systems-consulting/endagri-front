import React, { useState } from 'react';
import { Grid, Breadcrumb, Button } from 'semantic-ui-react';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import update from 'immutability-helper';
import { useToasts } from 'react-toast-notifications';
import VentesComponent from './VentesComponent';
import ActivitesComponent from './ActivitesComponent';
import InformationsPrincipalesComponent from './InformationsPrincipalesComponent';

import { useEffect } from 'react';
import Axios from 'axios';
import _ from 'lodash';

const ReadFichePage = () => {
  let history = useHistory();
  let { id } = useParams();
  const { addToast } = useToasts();

  const [fiche, setFiche] = useState({});

  useEffect(() => {
    Axios(`http://localhost:3333/fiche/${id}`)
      .then((res) => {
        // Petit workaround pour contourner le problème lié à la réponse envoyée par l'API
        res.data.activites = res.data.activites.filter((act) => {
          return act.id !== null;
        });

        res.data.activites = _.uniqBy(res.data.activites, function (e) {
          return e.id;
        });

        // Petit workaround pour contourner le problème lié à la réponse envoyée par l'API
        res.data.ventes = res.data.ventes.filter((vente) => {
          return vente.id !== null;
        });

        res.data.ventes = _.uniqBy(res.data.ventes, function (e) {
          return e.id;
        });

        setFiche(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteActivite = async (id_activite) => {
    Axios.delete(`http://localhost:3333/fiche/${id}/activite/${id_activite}`)
      .then((res) => {
        addToast("L'activité a bien été supprimée", {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedFiche = update(fiche, {
          activites: {
            $apply: (activites) =>
              activites.filter((activite) => {
                return activite.id !== id_activite;
              }),
          },
        });

        setFiche(updatedFiche);
      })
      .catch((err) => {
        console.log(err);
        addToast(
          "Problème lors de la suppression de l'activité et de ses dépenses associées",
          {
            appearance: 'error',
            autoDismiss: true,
          }
        );
      });
  };

  const postActivite = async (activite) => {
    Axios.post(`http://localhost:3333/fiche/${id}/activite`, activite)
      .then((res) => {
        addToast("L'activité a bien été ajoutée", {
          appearance: 'success',
          autoDismiss: true,
        });

        activite.id = res.data.id;

        let updatedFiche = update(fiche, {
          activites: {
            $push: [activite],
          },
        });

        setFiche(updatedFiche);
      })
      .catch((err) => {
        console.log(err);
        addToast("Erreur pendant la création de l'activité", {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const deleteVente = async (id_vente) => {
    Axios.delete(`http://localhost:3333/fiche/${id}/vente/${id_vente}`)
      .then((res) => {
        addToast('La vente a bien été supprimée', {
          appearance: 'success',
          autoDismiss: true,
        });

        let updatedFiche = update(fiche, {
          ventes: {
            $apply: (ventes) =>
              ventes.filter((vente) => {
                return vente.id !== id_vente;
              }),
          },
        });

        setFiche(updatedFiche);
      })
      .catch((err) => {
        console.log(err);
        addToast('Problème lors de la suppression de la vente ', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const postVente = async (vente) => {
    Axios.post(`http://localhost:3333/fiche/${id}/vente`, vente)
      .then((res) => {
        addToast('La vente a bien été ajoutée', {
          appearance: 'success',
          autoDismiss: true,
        });

        vente.id = res.data.id;

        let updatedFiche = update(fiche, {
          ventes: {
            $push: [vente],
          },
        });

        setFiche(updatedFiche);
      })
      .catch((err) => {
        console.log(err);
        addToast('Erreur pendant la création de la vente', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/fiches'>Fiches</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              Fiche {fiche.id} - {fiche.libelle}
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={10}>
          <ActivitesComponent
            deleteActivite={deleteActivite}
            postActivite={postActivite}
            activites={fiche.activites}
          />
        </Grid.Column>

        <Grid.Column width={6}>
          <InformationsPrincipalesComponent fiche={fiche} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <VentesComponent
          deleteVente={deleteVente}
          postVente={postVente}
          ventes={fiche.ventes}
        />
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Button
            as={Link}
            to={`/fiche/${fiche.id}/delete`}
            floated='right'
            negative
            size='small'
          >
            Supprimer la fiche
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadFichePage;
