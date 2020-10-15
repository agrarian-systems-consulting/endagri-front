import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Segment, Button, Form, Message, Image } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SemanticField from '../../app/utils/forms/SemanticField';
import { useToasts } from 'react-toast-notifications';
import authService from '../../app/auth/auth.service';
import Axios from 'axios';
import useUser from '../../app/auth/useUser';

const AccueilPage = () => {
  //Hooks
  let history = useHistory();
  const { addToast } = useToasts();
  const [message, setMessage] = useState('');
  const { loginUtilisateur } = useUser();

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    matricule: Yup.string().required("L'email est obligatoire"),
    password: Yup.string().required('Le mot de passe est obligatoire'),
  });

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Connexion</h5>
            </Segment>
            <Segment attached='bottom'>
              {message && (
                <Message
                  error
                  header='Action Forbidden'
                  content="Erreur d'authentification"
                />
              )}
              <Formik
                // Initial values are mandatory in Formik
                initialValues={{ matricule: '', password: '' }}
                // Handle form validation
                validationSchema={validationSchema}
                // Handle form submit
                onSubmit={(
                  { matricule, password },
                  { setSubmitting, resetForm }
                ) => {
                  setSubmitting(true);
                  // Essayer d'authentifier l'utilisateur
                  loginUtilisateur(matricule, password)
                    .then((response) => {
                      // Petit toast pour montrer à l'utilisateur qu'il est bien connecté
                      addToast('Vous êtes connecté avec succès', {
                        appearance: 'success',
                        autoDismiss: true,
                      });
                      // If authenticated got to desired page
                      history.push('/analyses');
                    })
                    .catch((error) => {
                      //TODO : Améliorer le message d'erreur avec l'API
                      setSubmitting(false);
                      setMessage("Erreur d'authentification");
                    });
                }}
              >
                {({
                  values,
                  errors,
                  dirty,
                  isValid,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <SemanticField
                      label='Matricule'
                      name='matricule'
                      component={Form.Input}
                    />
                    <SemanticField
                      label='Mot de passe'
                      name='password'
                      component={Form.Input}
                    />
                    <div>
                      <Button
                        primary
                        content='Se connecter'
                        type='submit'
                        disabled={isSubmitting || !isValid || !dirty}
                        loading={isSubmitting}
                      />
                      {process.env.API_URI}
                    </div>

                    {/* Uncomment following lines to debug form */}
                    {/* <pre>values = {JSON.stringify(values, null, 2)}</pre>
                <pre>errors = {JSON.stringify(errors, null, 2)}</pre>
                <pre>
                  firebaseError = {JSON.stringify(firebaseError, null, 2)}
                </pre> */}
                  </Form>
                )}
              </Formik>
            </Segment>
          </Segment.Group>
          <Image
            src={process.env.PUBLIC_URL + '/logo.jpeg'}
            size='small'
            centered
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AccueilPage;
