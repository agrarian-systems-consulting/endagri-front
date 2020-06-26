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

const ProduitFormComponent = ({ postProduit }) => {
  // Form validation handled with Yup
  const validationSchema = Yup.object({
    libelle: Yup.string().required('Le nom du produit est obligatoire'),
    unite: Yup.string().required("L'unité du produit est obligatoire"),
  });

  return (
    <Formik
      initialValues={{
        libelle: '',
        unite: '',
      }}
      // Handle form validation
      validationSchema={validationSchema}
      // Handle form submit
      onSubmit={(values, { setSubmitting, resetForm }) => {
        postProduit(values);
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
            label='Libellé'
            component={Form.Input}
          />

          <SemanticField
            name='unite'
            value=''
            label='Unité'
            component={Form.Input}
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

export default ProduitFormComponent;
