import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import { Form, Segment, Button, Icon, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticIntegerField from '../../../app/utils/forms/SemanticIntegerField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';

const monthsOptions = [
  { key: '1', value: 1, text: 'Janvier' },
  { key: '2', value: 2, text: 'Février' },
  { key: '3', value: 3, text: 'Mars' },
  { key: '4', value: 4, text: 'Avril' },
  { key: '5', value: 5, text: 'Mai' },
  { key: '6', value: 6, text: 'Juin' },
  { key: '7', value: 7, text: 'Juillet' },
  { key: '8', value: 8, text: 'Août' },
  { key: '9', value: 9, text: 'Septembre' },
  { key: '10', value: 10, text: 'Octobre' },
  { key: '11', value: 11, text: 'Novembre' },
  { key: '12', value: 12, text: 'Décembre' },
];

const VenteFormComponent = ({ postVente }) => {
  // Faire un get pour récupérer la liste des options en lien avec la production en cours
  const [marketsOptions, setMarketsOptions] = useState([
    { key: '1', value: 1, text: 'Produit A - Vente au champs - Bizerte' },
    { key: '2', value: 2, text: 'Produit A - Vente usine - Bizerte' },
    { key: '3', value: 3, text: 'Produit B - Vente usine - Bizerte' },
  ]);

  // TODO : Créer un useEffect pour peupler marketsOptions

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    id_marche: Yup.number().required('Le produit vendu est obligatoire'),
    rendement: Yup.number().required('Le rendement moyen est obligatoire'),
  });
  return (
    <Segment clearing>
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
              label='Produit, Lieu et Mode de vente'
              component={Form.Dropdown}
              fluid
              search
              selection
              clearable
              options={marketsOptions}
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
    </Segment>
  );
};

export default VenteFormComponent;
