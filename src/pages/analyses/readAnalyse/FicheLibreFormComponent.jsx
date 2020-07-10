import cuid from 'cuid';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import { useEffect } from 'react';
import Axios from 'axios';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';
import { format } from 'date-fns';

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

const FicheLibreFormComponent = () => {
  let history = useHistory();
  let { id } = useParams();
  const { addToast } = useToasts();
  const [fichesTechniques, setFichesTechniques] = useState([]);

  useEffect(() => {
    Axios(`http://localhost:3333/fiches`)
      .then((res) => {
        setFichesTechniques(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Construit un array d'object pour les options du select (Dropdown)
  const fichesTechniquesOptions = () => {
    let options = [];

    fichesTechniques.forEach((p) => {
      options.push({
        key: p.id,
        value: p.id,
        text: p.libelle,
      });
    });

    return options;
  };

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    coeff_surface_ou_nombre_animaux: Yup.number().required(
      'Ce champs est obligatoire'
    ),
  });

  return (
    <Formik
      initialValues={{
        date_ini: format(new Date(), 'yyyy-MM-dd'),
        coeff_surface_ou_nombre_animaux: 1,
        coeff_main_oeuvre_familiale: 0,
        coeff_ventes: [],
        coeff_depenses: [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        Axios.post(
          `http://localhost:3333/analyse/${id}/fiche-technique-libre`,
          values
        )
          .then((res) => {
            addToast('La fiche a bien été créée', {
              appearance: 'success',
              autoDismiss: true,
            });
          })
          .catch((err) => {
            console.log(err);
            addToast("Erreur lors de la création de l'analyse", {
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
      }) => (
        <Form onSubmit={handleSubmit}>
          <SemanticField
            name='id_fiche_technique'
            value=''
            label='Fiche technique de la production'
            component={Form.Dropdown}
            placeholder='Choisir une fiche'
            fluid
            search
            selection
            clearable
            options={fichesTechniquesOptions()}
          />
          <SemanticFloatField
            name='coeff_surface_ou_nombre_animaux'
            value=''
            label="Surface en hectares ou nombre d'animaux"
            component={Form.Input}
            type='number'
            step={0.01}
          />
          <SemanticField
            name='date_ini'
            value=''
            label='Date de semis ou mise bas'
            component={Form.Input}
          />

          <SemanticFloatField
            name='coeff_main_oeuvre_familiale'
            type='number'
            step={0.01}
            min='0'
            max='1'
            value=''
            label="Part de main d'oeuvre familiale"
            component={Form.Input}
          />

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Créer l'analyse
          </Button>
          <pre>values = {JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default FicheLibreFormComponent;
