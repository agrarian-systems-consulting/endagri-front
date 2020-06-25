import React from 'react';
import { Formik, FieldArray } from 'formik';
import { Form, Segment, Button, Icon, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticIntegerField from '../../../app/utils/forms/SemanticIntegerField';

const countryOptions = [
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

const TempActiviteForm = ({ postActivite }) => {
  // Form validation handled with Yup
  const validationSchema = Yup.object({
    libelle: Yup.string().required('Le libellé est obligatoire'),
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
          // Remettre les type:numbre sous forme d'integer

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
          handleChange,
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
              options={countryOptions}
            />
            <Form.Field>
              <label>Dépenses</label>
            </Form.Field>

            <FieldArray
              name='depenses'
              label='Dépenses'
              render={(arrayHelpers) => (
                <div>
                  {values.depenses.map((depense, index) => (
                    <div key={index}>
                      <SemanticField
                        label='Libellé'
                        name={`depenses.${index}.libelle`}
                        component={Form.Input}
                      />
                      <SemanticIntegerField
                        label='Montant'
                        name={`depenses.${index}.montant`}
                        component={Form.Input}
                        type='number'
                      />

                      <Button
                        size='mini'
                        icon
                        basic
                        circular
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <Icon name='trash' />
                      </Button>
                      <Divider></Divider>
                    </div>
                  ))}

                  <Button type='button' onClick={() => arrayHelpers.push('')}>
                    Ajouter une dépense
                  </Button>
                </div>
              )}
            />

            <Button
              type='submit'
              color='blue'
              floated='right'
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
