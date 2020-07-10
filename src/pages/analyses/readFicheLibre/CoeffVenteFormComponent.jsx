import { Formik } from 'formik';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';

const CoeffVenteFormComponent = ({ addCoeffVente }) => {
  const categorieDepenseOptions = [
    { key: '3', value: 'Engrais', text: 'Engrais' },
    { key: '4', value: 'Fumier', text: 'Fumier' },
    { key: '5', value: 'Paille', text: 'Paille' },
    { key: '6', value: 'Foin', text: 'Foin' },
    { key: '7', value: 'Concentrés', text: 'Concentrés' },
  ];

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    libelle_categorie: Yup.string().required('Ce champs est obligatoire'),
    coeff_intraconsommation: Yup.number().required('Ce champs est obligatoire'),
  });

  return (
    <Formik
      initialValues={{
        libelle_categorie: '',
        coeff_intraconsommation: 0,
        coeff_autoconsommation: 0,
        coeff_rendement: 1,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        addCoeffVente(values);
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
            label='Produit'
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
            label="Part utilisée sur l'exploitation (pour d'autres cultures ou élevages)"
            component={Form.Input}
            type='number'
            min='0'
            max='1'
            step={0.01}
          />
          <SemanticFloatField
            name='coeff_autoconsommation'
            value=''
            label='Part autoconsommée'
            component={Form.Input}
            type='number'
            min='0'
            max='1'
            step={0.01}
          />
          <SemanticFloatField
            name='coeff_rendement'
            value=''
            label='Rendement par rapport au rendement moyen'
            component={Form.Input}
            type='number'
            min='0.5'
            max='1.5'
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
          <pre>values = {JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default CoeffVenteFormComponent;
