import Axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';

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
  const { addToast } = useToasts();

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
        Axios.post(`http://51.210.14.158:3333/production`, values)
          .then((res) => {
            addToast('La production a bien été créée', {
              appearance: 'success',
              autoDismiss: true,
            });
            history.push(`/production/${res.data.id}`);
          })
          .catch((err) => {
            console.log(err);
            addToast('Erreur lors de la cration de la production ', {
              appearance: 'error',
              autoDismiss: true,
            });
          });
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
