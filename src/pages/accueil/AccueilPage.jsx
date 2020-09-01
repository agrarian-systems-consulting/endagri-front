import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Segment, Button, Form, Message } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SemanticField from '../../app/utils/forms/SemanticField';
import { useToasts } from 'react-toast-notifications';

const AccueilPage = () => {
  //Hooks
  let history = useHistory();
  const { addToast } = useToasts();

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("L'email est invalide")
      .required("L'email est obligatoire"),
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
              <Formik
                // Initial values are mandatory in Formik
                initialValues={{ email: '', password: '' }}
                // Handle form validation
                validationSchema={validationSchema}
                // Handle form submit
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  // Authenticate with Firebase

                  // Petit toast pour montrer à l'utilisateur qu'il est bien connecté
                  addToast('Vous êtes connecté avec succès', {
                    appearance: 'success',
                    autoDismiss: true,
                  });
                  // If authenticated got to desired page
                  history.push('/analyses');
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
                      label='Email'
                      name='email'
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AccueilPage;
