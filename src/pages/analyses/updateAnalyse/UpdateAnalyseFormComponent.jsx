import Axios from 'axios';
import { format } from 'date-fns';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Form, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticIntegerField from '../../../app/utils/forms/SemanticIntegerField';
import DatePicker from 'react-datepicker';
import _ from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import authHeader from '../../../app/auth/auth-header';
import { useState } from 'react';
import useUser from '../../../app/auth/useUser';

const UpdateAnalyseFormComponent = () => {
  let history = useHistory();
  const { addToast } = useToasts();
  let { id } = useParams();
  const { utilisateur } = useUser();

  const [analyse, setAnalyse] = useState({});

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    nom_utilisateur: Yup.string().required(
      "Le nom de l'auteur est obligatoire"
    ),
    nom_client: Yup.string().required("Le nom de l'auteur est obligatoire"),
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_URI}/analyse/${id}`,
        { headers: authHeader() }
      );

      setAnalyse(
        _.omit(res.data, ['depenses_libres', 'fiches_techniques_libres'])
      );
    };

    fetchData();
  }, [id]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...analyse,
        modified: new Date(),
        date_debut_analyse: new Date(),
        date_fin_analyse: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        Axios.put(`${process.env.REACT_APP_API_URI}/analyse/${id}`, values, {
          headers: authHeader(),
        })
          .then((res) => {
            addToast("L'analyse a bien été modifiée", {
              appearance: 'success',
              autoDismiss: true,
            });
            history.push(`/analyse/${res.data.id}`);
          })
          .catch((err) => {
            console.log(err);
            addToast("Erreur lors de la modificiation de l'analyse", {
              appearance: 'error',
              autoDismiss: true,
            });
            history.push(`/analyse/${id}`);
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
          {utilisateur.role === 'SUPER_ADMIN' && (
            <SemanticField
              name='nom_utilisateur'
              value=''
              label="Matricule de l'auteur de l'analyse"
              component={Form.Input}
            />
          )}
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
              <label>Nouvelle date de début d'analyse</label>
              <DatePicker
                selected={values.date_debut_analyse}
                dateFormat='dd/MM/yyyy'
                className='form-control'
                name='date_debut_analyse'
                onChange={(date) => setFieldValue('date_debut_analyse', date)}
              />
            </Form.Field>
            <Form.Field>
              <label>Nouvelle date de fin d'analyse</label>
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
            disabled={isSubmitting || !isValid}
            loading={isSubmitting}
          >
            Mettre à jour l'analyse
          </Button>
          <Button as={NavLink} exact to={`/analyse/${id}`}>
            Annuler
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre>
          <pre>analyse = {JSON.stringify(analyse, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default UpdateAnalyseFormComponent;
