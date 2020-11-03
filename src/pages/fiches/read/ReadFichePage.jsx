import Axios from 'axios';
import update from 'immutability-helper';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Breadcrumb, Button, Grid } from 'semantic-ui-react';
import ActivitesComponent from './ActivitesComponent';
import InformationsPrincipalesComponent from './InformationsPrincipalesComponent';
import VentesComponent from './VentesComponent';
import TableauRecapComponent from './TableauRecapComponent';
import authHeader from '../../../app/auth/auth-header';
import useUser from '../../../app/auth/useUser';

const ReadFichePage = () => {
  let { id } = useParams();
  const { addToast } = useToasts();

  const [fiche, setFiche] = useState({});
  const { utilisateur } = useUser();

  useEffect(() => {
    Axios(`${process.env.REACT_APP_API_URI}/fiche/${id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        setFiche(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteActivite = async (id_activite) => {
    Axios.delete(
      `${process.env.REACT_APP_API_URI}/fiche/${id}/activite/${id_activite}`,
      { headers: authHeader() }
    )
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
    Axios.post(
      `${process.env.REACT_APP_API_URI}/fiche/${id}/activite`,
      activite,
      { headers: authHeader() }
    )
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
    Axios.delete(
      `${process.env.REACT_APP_API_URI}/fiche/${id}/vente/${id_vente}`,
      { headers: authHeader() }
    )
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
    Axios.post(`${process.env.REACT_APP_API_URI}/fiche/${id}/vente`, vente, {
      headers: authHeader(),
    })
      .then((res) => {
        addToast('La vente a bien été ajoutée', {
          appearance: 'success',
          autoDismiss: true,
        });

        vente = res.data;

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
          {/* <pre>{JSON.stringify(fiche.activites, true, 2)}</pre> */}
        </Grid.Column>

        <Grid.Column width={6}>
          <InformationsPrincipalesComponent fiche={fiche} />
          <TableauRecapComponent fiche={fiche} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <VentesComponent
          deleteVente={deleteVente}
          postVente={postVente}
          ventes={fiche.ventes}
          id_production={fiche.id_production}
        />
      </Grid.Row>
      {['SUPER_ADMIN', 'ADMINISTRATEUR_ENDAGRI'].includes(utilisateur.role) && (
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
      )}
    </Grid>
  );
};

export default ReadFichePage;
