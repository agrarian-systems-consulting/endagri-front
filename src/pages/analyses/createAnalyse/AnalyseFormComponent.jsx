import Axios from 'axios';
import { format } from 'date-fns';
import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticIntegerField from '../../../app/utils/forms/SemanticIntegerField';

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
        nom_utilisateur: '',
        nom_client: '',
        montant_tresorerie_initiale: 0,
        created: format(new Date(), 'yyyy-MM-dd'),
        modified: null,
        date_debut_analyse: format(new Date(), 'yyyy-MM-dd'),
        date_fin_analyse: format(
          new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          'yyyy-MM-dd'
        ),
        id_utilisateur: 1,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        Axios.post(`https://endagriapi.geomatick.com/analyse`, values)
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
            <SemanticField
              name='date_debut_analyse'
              value=''
              label="Date de début d'analyse"
              component={Form.Input}
            />
            <SemanticField
              name='date_fin_analyse'
              value=''
              label="Date de fin d'analyse"
              component={Form.Input}
            />
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
