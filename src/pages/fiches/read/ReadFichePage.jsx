import React, { useState } from 'react';
import {
  Grid,
  Breadcrumb,
  Segment,
  List,
  Table,
  Label,
  Button,
  Icon,
} from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import update from 'immutability-helper';
import { useToasts } from 'react-toast-notifications';
import VentesComponent from './VentesComponent';
import ActivitesComponent from './ActivitesComponent';
import InformationsPrincipalesComponent from './InformationsPrincipalesComponent';
import GrapheComponent from './GrapheComponent';

const ReadFichePage = () => {
  const [fiche, setFiche] = useState({
    id: 42,
    libelle_fiche: 'Tomates hors-sol en agriculture biologique',
    production: 'Tomate',
    type_production: 'Culture annuelle',
    id_utilisateur: 35,
    auteur: 'Sami Laouini',
    activites: [
      {
        id: 10,
        libelle_activite: 'Labour',
        mois_relatif: -1,
        depenses: [
          {
            id: 13,
            libelle_depense: 'Tracteur',
            montant: 1500,
          },
          {
            id: 14,
            libelle_depense: "Main d'oeuvre",
            montant: 500,
          },
        ],
      },
      {
        id: 11,
        libelle_activite: 'Semis',
        mois_relatif: 0,
        depenses: [
          {
            id: 15,
            libelle_depense: 'Tracteur',
            montant: 500,
          },
          {
            id: 16,
            libelle_depense: "Main d'oeuvre",
            montant: 500,
          },
        ],
      },
      {
        id: 12,
        libelle_activite: 'Récolte',
        mois_relatif: 5,
        depenses: [
          {
            id: 17,
            libelle_depenses: "Main d'oeuvre",
            montant: 200,
          },
        ],
      },
    ],
    ventes: [
      {
        id: 13,
        id_marche: 24,
        unite: 't',
        rendement_min: 400,
        rendement: 500,
        rendemet_max: 600,
        mois_relatif: 5,
      },
      {
        id: 14,
        id_marche: 24,
        unite: 't',
        rendement_min: 200,
        rendement: 300,
        rendemet_max: 400,
        mois_relatif: 6,
      },
    ],
  });

  const { addToast } = useToasts();

  const deleteActivite = async (id_activite) => {
    // TODO LAncer la requête asynchorne à l'API
    // await axios.delete()

    let updatedFiche = update(fiche, {
      activites: {
        $apply: (activites) =>
          activites.filter((activite) => {
            return activite.id !== id_activite;
          }),
      },
    });

    setFiche(updatedFiche);

    addToast("L'activité a bien été supprimée", {
      appearance: 'success',
      autoDismiss: true,
    });
  };

  const deleteVente = async (id_vente) => {
    // TODO LAncer la requête asynchorne à l'API
    // await axios.delete()

    let updatedFiche = update(fiche, {
      ventes: {
        $apply: (ventes) =>
          ventes.filter((vente) => {
            return vente.id !== id_vente;
          }),
      },
    });

    setFiche(updatedFiche);
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
              Fiche {fiche.id} - {fiche.libelle_fiche}
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <GrapheComponent />
        <InformationsPrincipalesComponent fiche={fiche} />
      </Grid.Row>
      <Grid.Row>
        <ActivitesComponent
          deleteActivite={deleteActivite}
          activites={fiche.activites}
        />
      </Grid.Row>
      <Grid.Row>
        <VentesComponent deleteVente={deleteVente} ventes={fiche.ventes} />
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
