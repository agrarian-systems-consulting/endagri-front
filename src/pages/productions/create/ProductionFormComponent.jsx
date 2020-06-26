import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import { Form, Segment, Button, Icon, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';
import cuid from 'cuid';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import typeVenteOptions from '../../../app/data/typeVenteOptions';

const typeProductionsOptions = [
  { key: 1, value: 'Culture annuelle', text: 'Culture annuelle' },
  { key: 2, value: 'Culture pérenne', text: 'Culture pérenne' },
  { key: 3, value: 'Elevage bovin laitier', text: 'Elevage bovin laitier' },
  {
    key: 4,
    value: 'Elevage ovin engraisseur',
    text: 'Elevage ovin engraisseur',
  },
  {
    key: 5,
    value: 'Elevage ovin naisseur-engraisseur',
    text: 'Elevage ovin naisseur-engraisseur',
  },
  { key: 6, value: 'Elevage apicole', text: 'Elevage apicole' },
];

const ProductionFormComponent = () => {
  let history = useHistory();
  // Form validation handled with Yup
  const validationSchema = Yup.object({
    libelle: Yup.string().required('Le nom du produit est obligatoire'),
    type_production: Yup.string().required(
      'Le type de production est obligatoire'
    ),
  });

  return (
    <Formik
      initialValues={{
        libelle: '',
        type_production: '',
      }}
      // Handle form validation
      validationSchema={validationSchema}
      // Handle form submit
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // axios.post

        //Temporaire
        const id = cuid();

        history.push(`/production/${id}`);
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
            label='Libellé'
            component={Form.Input}
          />

          <SemanticField
            name='type_production'
            value=''
            label='Type de production'
            component={Form.Dropdown}
            fluid
            search
            selection
            clearable
            options={typeProductionsOptions}
            multiple={false}
          />

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Créer le produit
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default ProductionFormComponent;
