import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import { Form, Segment, Button, Icon, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticIntegerField from '../../../app/utils/forms/SemanticIntegerField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';
import cuid from 'cuid';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

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

const FicheFormComponent = () => {
  let history = useHistory();
  const { addToast } = useToasts();
  // Faire un get pour récupérer la liste des options en lien avec la production en cours
  const [productionOptions, setProductionOptions] = useState([
    { key: '1', value: 1, text: 'Blé' },
    { key: '2', value: 2, text: 'Carotte' },
    { key: '3', value: 3, text: 'Tomate' },
  ]);

  // TODO : Créer un useEffect pour peupler productionOptions

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
        id_production: null,
        libelle: null,
        commentaire: null,
        ini_debut: null,
        ini_fin: null,
      }}
      // Handle form validation
      validationSchema={validationSchema}
      // Handle form submit
      onSubmit={(values, { setSubmitting }) => {
        // Ajouter la fiche
        // const res = await axios.post
        // Récupérer l'id de la fiche créer
        // res.body.id
        const id = cuid();

        addToast('La fiche a bien été créée', {
          appearance: 'success',
          autoDismiss: true,
        });

        // Rediriger vers la page de la fiche
        history.push(`/fiche/${id}`);
        // Attention : ici il y avait un problème dans le back pour récupérer le contenu d'une fiche qui n'a pas encore d'activités ou de dépenses à revoir
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
            name='id_production'
            value=''
            label='Produit, Lieu et Mode de vente'
            component={Form.Dropdown}
            fluid
            search
            selection
            clearable
            options={productionOptions}
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

export default FicheFormComponent;
