import React from 'react';
import { Formik, FieldArray } from 'formik';
import { Form, Segment, Button, Icon, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticIntegerField from '../../../app/utils/forms/SemanticIntegerField';
import categorieDepenseOptions from '../../../app/data/categorieDepenses';
import monthsOptions from '../../../app/data/monthsOptions';

const ActiviteForm = ({ postActivite }) => {
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
          // Ajouter l'activité
          postActivite(values);

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
              clearable
              options={monthsOptions}
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
                      <Form.Group widths='equal'>
                        <SemanticField
                          label='Libellé'
                          name={`depenses.${index}.libelle`}
                          component={Form.Dropdown}
                          fluid
                          search
                          selection
                          clearable
                          options={categorieDepenseOptions}
                        />
                        <SemanticIntegerField
                          label='Montant'
                          name={`depenses.${index}.montant`}
                          component={Form.Input}
                          type='number'
                        />
                      </Form.Group>

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
            {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default ActiviteForm;
