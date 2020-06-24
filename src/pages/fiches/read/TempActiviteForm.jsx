import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Segment, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';

const countryOptions = [
  { key: '1', value: '1', text: 'Janvier' },
  { key: '2', value: '2', text: 'Février' },
  { key: '3', value: '3', text: 'Mars' },
  { key: '4', value: '4', text: 'Avril' },
  { key: '5', value: '5', text: 'Mai' },
  { key: '6', value: '6', text: 'Juin' },
  { key: '7', value: '7', text: 'Juillet' },
  { key: '8', value: '8', text: 'Août' },
  { key: '9', value: '9', text: 'Septembre' },
  { key: '10', value: '10', text: 'Octobre' },
  { key: '11', value: '11', text: 'Novembre' },
  { key: '12', value: '12', text: 'Décembre' },
];

const TempActiviteForm = ({ postActivite }) => {
  // Form validation handled with Yup
  const validationSchema = Yup.object({
    libelle: Yup.string().required('Le libellé est obligatoire'),
  });

  return (
    <Segment>
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
          // Ajouter l'activité
          postActivite(values);

          // Nettoyer le formulaire
          resetForm();

          // Optionnel : set focus à nouveau sur le formulaire
        }}
      >
        {({
          values,
          errors,
          dirty,
          isValid,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <SemanticField
              name='libelle'
              value=''
              label='Libelle'
              component={Form.Input}
            />
            <SemanticField
              name='mois_relatif'
              value=''
              label='Mois relatif'
              component={Form.Input}
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
              options={countryOptions}
            />

            <Button
              type='submit'
              color='blue'
              disabled={isSubmitting || !isValid || !dirty}
              loading={isSubmitting}
            >
              Ajouter
            </Button>
            <pre>values = {JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default TempActiviteForm;
