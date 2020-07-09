import cuid from 'cuid';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import { useEffect } from 'react';
import Axios from 'axios';

const monthsOptions = [
  { key: '1', value: 1, text: 'Janvier' },
  { key: '2', value: 2, text: 'Février' },
  { key: '3', value: 3, text: 'Mars' },
  { key: '4', value: 4, text: 'Avril' },
  { key: '5', value: 5, text: 'Mai' },
  { key: '6', value: 6, text: 'Juin' },
  { key: '7', value: 7, text: 'Juillet' },
  { key: '8', value: 8, text: 'Août' },
  { key: '9', value: 9, text: 'Septembre' },
  { key: '10', value: 10, text: 'Octobre' },
  { key: '11', value: 11, text: 'Novembre' },
  { key: '12', value: 12, text: 'Décembre' },
];

const AnalyseFormComponent = () => {
  let history = useHistory();
  const { addToast } = useToasts();

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    id_production: Yup.number().required('La production est obligatoire'),
    libelle: Yup.string().required(
      'Le libellé (nom) de la fiche est obligatoire'
    ),
  });

  return (
    <Formik
      initialValues={{
        nom_utilisateur: '',
        nom_client: '',
        montant_tresorerie_initiale: 0,
        date_debut_analyse: Date.now(),
        date_fin_analyse: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        id_utilisateur: 1,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Axios.post(`http://localhost:3333/fiche`, values)
        //   .then((res) => {
        //     addToast('La fiche a bien été créée', {
        //       appearance: 'success',
        //       autoDismiss: true,
        //     });
        //     history.push(`/fiche/${res.data.id}`);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     addToast('Erreur lors de la création de la fiche', {
        //       appearance: 'error',
        //       autoDismiss: true,
        //     });
        //     history.push(`/fiches`);
        //   });
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
            name='id_production'
            value=''
            label='Production'
            component={Form.Dropdown}
            fluid
            search
            selection
            clearable
            options={productionsOptions()}
          />
          <SemanticField
            name='libelle'
            value=''
            label='Libellé'
            component={Form.Input}
          />
          <Form.Group widths='equal'>
            <SemanticField
              name='ini_debut'
              value=''
              label='Période de démarrage possible - Début'
              component={Form.Dropdown}
              placeholder='Choisir un mois'
              fluid
              search
              selection
              clearable
              options={monthsOptions}
            />
            <SemanticField
              name='ini_fin'
              value=''
              label='Période de démarrage possible - Fin'
              component={Form.Dropdown}
              placeholder='Choisir un mois'
              fluid
              search
              selection
              clearable
              options={monthsOptions}
            />
          </Form.Group>
          <SemanticField
            name='commentaire'
            value=''
            label='Commentaire'
            component={Form.TextArea}
          />

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Créer la fiche
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default AnalyseFormComponent;
