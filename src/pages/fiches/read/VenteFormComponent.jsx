import React, { useState, Fragment } from 'react';
import { Formik } from 'formik';
import { Form, Segment, Button, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticIntegerField from '../../../app/utils/forms/SemanticIntegerField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';
import monthsOptions from '../../../app/data/monthsOptions';
import { useEffect } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

const VenteFormComponent = ({ postVente, id_production }) => {
  // Faire un get pour récupérer la liste des options en lien avec la production en cours
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    Axios(`http://51.210.14.158:3333/marches?id_production=${id_production}`)
      .then((res) => {
        setMarkets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id_production]);

  // Construit un array d'object pour les options du select (Dropdown)
  const marketOptions = () => {
    let options = [];

    markets.forEach((market) => {
      options.push({
        key: market.id,
        value: market.id,
        text:
          market.libelle_produit +
          ' - ' +
          market.type_marche +
          ' - ' +
          market.localisation +
          ' (' +
          market.unite +
          ')',
      });
    });

    return options;
  };

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    id_marche: Yup.number().required('Le produit vendu est obligatoire'),
    rendement: Yup.number().required('Le rendement moyen est obligatoire'),
  });
  return (
    <Segment clearing>
      {marketOptions().length === 0 ? (
        <Fragment>
          <p>
            Aucun marché n'a été créé pour les produits de cette production.
          </p>
          <p>Il n'est donc pas encore possible de créer des ventes.</p>
          <p>
            Renseigner les prix de vente pour au moins un des produits de votre
            production dans l'onglet marchés.
          </p>

          <Button color='blue' as={NavLink} to='/marche/create'>
            Créer un nouveau marché
          </Button>
        </Fragment>
      ) : (
        <Formik
          initialValues={{
            id_marche: null,
            mois: null,
            mois_relatif: null,
            rendement: null,
            rendement_min: null,
            rendement_max: null,
          }}
          // Handle form validation
          validationSchema={validationSchema}
          // Handle form submit
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // Ajouter la vente
            postVente(values);
            // Nettoyer le formulaire
            resetForm();
          }}
        >
          {({
            values,
            errors,
            dirty,
            isValid,
            handleChange,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <SemanticField
                name='id_marche'
                value=''
                label='Libellé'
                component={Form.Dropdown}
                fluid
                search
                selection
                clearable
                options={marketOptions()}
              />
              <Form.Group widths='equal'>
                <SemanticIntegerField
                  name='mois_relatif'
                  value=''
                  label='Mois relatif'
                  component={Form.Input}
                  type='number'
                />
                <SemanticField
                  name='mois'
                  value=''
                  label='Mois calendaire'
                  component={Form.Dropdown}
                  placeholder='Choisir un mois'
                  fluid
                  search
                  selection
                  clearable
                  options={monthsOptions}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <SemanticFloatField
                  name='rendement_min'
                  value=''
                  label='Rendement min.'
                  component={Form.Input}
                  type='number'
                  step={0.01}
                />
                <SemanticFloatField
                  name='rendement'
                  value=''
                  label='Rendement moy.'
                  component={Form.Input}
                  type='number'
                  step={0.01}
                />
                <SemanticFloatField
                  name='rendement_max'
                  value=''
                  label='Rendement max.'
                  component={Form.Input}
                  type='number'
                  step={0.01}
                />
              </Form.Group>

              <Divider></Divider>
              <Button
                type='submit'
                color='blue'
                floated='right'
                disabled={isSubmitting || !isValid || !dirty}
                loading={isSubmitting}
              >
                Ajouter la vente
              </Button>
              {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      )}
    </Segment>
  );
};

export default VenteFormComponent;
