import React from 'react';
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

const VenteFormComponent = () => {
  // Form validation handled with Yup
  const validationSchema = Yup.object({
    libelle: Yup.string().required('Le libellé est obligatoire'),
    rendement: Yup.string().required('Le rendement moyen est obligatoire'),
  });
  return (
    <Segment clearing>
      <Formik
        initialValues={{
          libelle: '',
          mois: '',
          mois_relatif: '',
          depenses: [],
        }}
        // Handle form validation
        validationSchema={validationSchema}
        // Handle form submit
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // Ajouter la vente

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
              name='id_marche ?'
              value=''
              label='Libelle'
              component={Form.Input}
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
              />
              <SemanticFloatField
                name='rendement_max'
                value=''
                label='Rendement max.'
                component={Form.Input}
                type='number'
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
              Ajouter l'activité
            </Button>
            <pre>values = {JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default VenteFormComponent;
