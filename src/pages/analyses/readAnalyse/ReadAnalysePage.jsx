import React, { useState } from 'react';
import {
  Grid,
  Breadcrumb,
  Segment,
  List,
  Header,
  Button,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import InformationsPrincipalesComponent from './InformationsPrincipalesComponent';
import ProductionsComponent from './ProductionsComponent';

const ReadAnalysePage = () => {
  const [info, setInfo] = useState({
    id: 2,
    created: '2020-06-09T22:00:00.000Z',
    modified: '2020-06-09T22:00:00.000Z',
    nom_utilisateur: 'Auteur modifié',
    nom_client: 'Client modifié',
    montant_tresorerie_initiale: 1234,
    date_debut_analyse: '2020-05-05T22:00:00.000Z',
    date_fin_analyse: '2021-05-05T22:00:00.000Z',
  });
  const [fichesLibres, setFichesLibres] = useState([
    {
      id_fiche_technique_libre: 3,
      id_fiche_technique: 2,
      date_ini: '2020-01-01T00:00:00',
      coeff_surface_ou_nombre_animaux: 5,
      coeff_main_oeuvre_familiale: 0.2,
      coeff_ventes: [
        {
          libelle_categorie: null,
          coeff_autoconsommation: 0,
          coeff_intraconsommation: 0,
          coeff_rendement: 1,
        },
      ],
      coeff_depenses: [
        {
          libelle_categorie: null,
          coeff_intraconsommation: 0,
        },
      ],
    },
    {
      id_fiche_technique_libre: 4,
      id_fiche_technique: 4,
      date_ini: '2020-01-01T00:00:00',
      coeff_surface_ou_nombre_animaux: 20,
      coeff_main_oeuvre_familiale: 0.1,
      coeff_ventes: [
        {
          libelle_categorie: null,
          coeff_autoconsommation: 0,
          coeff_intraconsommation: 0,
          coeff_rendement: 1,
        },
      ],
      coeff_depenses: [
        {
          libelle_categorie: null,
          coeff_intraconsommation: 0,
        },
      ],
    },
  ]);

  // Fetch les données depuis l'API dans un useEffect avec axios

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/analyses'>Analyses</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Analyse 1</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <InformationsPrincipalesComponent info={info} />
      <ProductionsComponent fichesLibres={fichesLibres} />
      <Grid.Row>
        <Grid.Column width={16}>
          <Button color='red' as={NavLink} to='/analyse/1/delete'>
            Supprimer l'analyse
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadAnalysePage;
