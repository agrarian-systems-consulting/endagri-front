import Axios from 'axios';
import { format } from 'date-fns';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';
import categorieDepenseOptions from '../../../app/data/categorieDepenses';

const CoeffDepenseFormComponent = ({ addFicheTechniqueLibre }) => {
  // Form validation handled with Yup
  const validationSchema = Yup.object({
    libelle_categorie: Yup.string().required('Ce champs est obligatoire'),
  });

  return (
    <Formik
      initialValues={{
        libelle_categorie: '',
        coeff_intraconsommation: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        addFicheTechniqueLibre(values);
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
      }) => (
        <Form onSubmit={handleSubmit}>
          <SemanticField
            name='libelle_categorie'
            value=''
            label='Catégorie de dépense'
            component={Form.Dropdown}
            placeholder='Choisir une catégorie'
            fluid
            search
            selection
            clearable
            options={categorieDepenseOptions}
          />
          <SemanticFloatField
            name='coeff_intraconsommation'
            value=''
            label="Part d'intraconsommation (= part utilisée sur l'exploitation pour d'autres cultures ou élevage"
            component={Form.Input}
            type='number'
            step={0.01}
          />

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Ajouter
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default CoeffDepenseFormComponent;
