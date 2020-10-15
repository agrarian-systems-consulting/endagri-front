import Axios from 'axios';
import { format } from 'date-fns';
import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Form, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticIntegerField from '../../../app/utils/forms/SemanticIntegerField';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import authHeader from '../../../app/auth/auth-header';

const AnalyseFormComponent = () => {
  let history = useHistory();
  const { addToast } = useToasts();

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    nom_utilisateur: Yup.string().required(
      "Le nom de l'auteur est obligatoire"
    ),
    nom_client: Yup.string().required("Le nom de l'auteur est obligatoire"),
  });

  return (
    <Formik
      initialValues={{
        startDate: new Date(),
        nom_utilisateur: '',
        nom_client: '',
        montant_tresorerie_initiale: 0,
        created: format(new Date(), 'yyyy-MM-dd'),
        modified: null,
        date_debut_analyse: new Date(),
        date_fin_analyse: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        id_utilisateur: 1,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        Axios.post(`${process.env.REACT_APP_API_URI}/analyse`, { headers: authHeader()}, values)
          .then((res) => {
            addToast("L'analyse a bien été créée", {
              appearance: 'success',
              autoDismiss: true,
            });
            history.push(`/analyse/${res.data.id}`);
          })
          .catch((err) => {
            console.log(err);
            addToast("Erreur lors de la création de l'analyse", {
              appearance: 'error',
              autoDismiss: true,
            });
            history.push(`/analyses`);
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
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <SemanticField
            name='nom_utilisateur'
            value=''
            label="Nom de l'auteur de l'analyse"
            component={Form.Input}
          />
          <SemanticField
            name='nom_client'
            value=''
            label='Nom du client'
            component={Form.Input}
          />
          <SemanticIntegerField
            name='montant_tresorerie_initiale'
            type='number'
            value=''
            label='Montant de trésorerie initiale'
            component={Form.Input}
          />
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Date de début d'analyse</label>
              <DatePicker
                selected={values.date_debut_analyse}
                dateFormat='dd/MM/yyyy'
                className='form-control'
                name='date_debut_analyse'
                onChange={(date) => setFieldValue('date_debut_analyse', date)}
              />
            </Form.Field>
            <Form.Field>
              <label>Date de fin d'analyse</label>
              <DatePicker
                selected={values.date_fin_analyse}
                locale='fr-FR'
                dateFormat='dd/MM/yyyy'
                className='form-control'
                name='date_fin_analyse'
                onChange={(date) => setFieldValue('date_fin_analyse', date)}
              />{' '}
            </Form.Field>
          </Form.Group>

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Créer l'analyse
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default AnalyseFormComponent;
