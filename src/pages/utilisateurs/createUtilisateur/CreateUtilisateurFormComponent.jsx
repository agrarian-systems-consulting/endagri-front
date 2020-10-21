import Axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import authHeader from '../../../app/auth/auth-header';
import SemanticField from '../../../app/utils/forms/SemanticField';

const rolesOptions = [
  { key: 1, value: 'SUPER_ADMIN', text: 'SUPER_ADMIN' },
  { key: 2, value: 'ADMINISTRATEUR_ENDAGRI', text: 'ADMINISTRATEUR_ENDAGRI' },
  { key: 3, value: 'AGRONOME_REGIONAL', text: 'AGRONOME_REGIONAL' },
  {
    key: 4,
    value: 'SUPERVISEUR_AGENCE',
    text: 'SUPERVISEUR_AGENCE',
  },
  {
    key: 5,
    value: 'GESTIONNAIRE_DE_PORTEFEUILLE',
    text: 'GESTIONNAIRE_DE_PORTEFEUILLE',
  },
];

const CreateUtilisateurFormComponent = () => {
  let history = useHistory();
  const { addToast } = useToasts();

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    matricule: Yup.string().required('Le nom du produit est obligatoire'),
    role: Yup.string().required('Le type de production est obligatoire'),
  });

  return (
    <Formik
      initialValues={{
        matricule: '',
        role: '',
        password: '',
      }}
      // Handle form validation
      validationSchema={validationSchema}
      // Handle form submit
      onSubmit={(values, { setSubmitting, resetForm }) => {
        Axios.post(
          `${process.env.REACT_APP_API_URI}/utilisateur/create`,
          values,
          {
            headers: authHeader(),
          }
        )
          .then((res) => {
            addToast("L'utilisateur a bien été créé", {
              appearance: 'success',
              autoDismiss: true,
            });
            history.push(`/utilisateurs`);
          })
          .catch((err) => {
            console.error(err);
            addToast("Erreur lors de la création de l'utilisateur", {
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
            name='matricule'
            value=''
            label='Matricule'
            component={Form.Input}
          />
          <SemanticField
            name='password'
            value=''
            label='Mot de passe'
            component={Form.Input}
          />

          <SemanticField
            name='role'
            value=''
            label='Role'
            component={Form.Dropdown}
            fluid
            search
            selection
            clearable
            options={rolesOptions}
            multiple={false}
          />

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Créer l'utilisateur
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default CreateUtilisateurFormComponent;
