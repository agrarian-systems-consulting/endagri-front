import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import { Form, Segment, Button, Icon, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';
import cuid from 'cuid';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import typeVenteOptions from '../../../app/data/typeVenteOptions';

const MarcheFormComponent = () => {
  let history = useHistory();
  const { addToast } = useToasts();
  // Faire un get pour récupérer la liste des options en lien avec la production en cours
  const [produits, setProduits] = useState([
    {
      id: 1,
      libelle: 'Paille de blé dur',
      unite: 'tonne de matière sèche',
    },
    {
      id: 2,
      libelle: 'Grains de blé dur',
      unite: 'quintal',
    },
  ]);

  // TODO : Créer un useEffect pour peupler productionOptions

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    id_produit: Yup.number().required('Le produit est obligatoire'),
    localisation: Yup.string().required('La localisation est obligatoire'),
    type_vente: Yup.string().required('Le type de vente est obligatoire'),
  });

  // Construit un array d'object pour les options du select (Dropdown)
  const produitsOptions = () => {
    let options = [];

    produits.forEach((produit) => {
      options.push({
        key: produit.id,
        value: produit.id,
        text: produit.libelle + ' (' + produit.unite + ')',
      });
    });

    return options;
  };

  return (
    <Formik
      initialValues={{
        id_produit: '',
        localisation: '',
        type_vente: '',
        prix_january: null,
        prix_february: null,
        prix_march: null,
        prix_april: null,
        prix_may: null,
        prix_june: null,
        prix_july: null,
        prix_august: null,
        prix_september: null,
        prix_october: null,
        prix_november: null,
        prix_december: null,
      }}
      // Handle form validation
      validationSchema={validationSchema}
      // Handle form submit
      onSubmit={(values, { setSubmitting }) => {
        // Ajouter le marché
        // const res = await axios.post
        // Récupérer l'id de la fiche créer
        // res.body.id
        const id = cuid();

        addToast('Le marché a bien été créé', {
          appearance: 'success',
          autoDismiss: true,
        });

        // Rediriger vers la page de la fiche
        history.push(`/marche/${id}`);
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
            name='id_produit'
            value=''
            label='Produit'
            component={Form.Dropdown}
            multiple={false}
            fluid
            search
            selection
            clearable
            options={produitsOptions()}
          />
          <SemanticField
            name='localisation'
            value=''
            label='Localisation'
            component={Form.Input}
          />

          <SemanticField
            name='type_vente'
            value=''
            label='Type de vente'
            component={Form.Dropdown}
            fluid
            search
            selection
            clearable
            options={typeVenteOptions}
          />

          <h5>Prix mensuels</h5>
          <Form.Group widths='equal'>
            <SemanticFloatField
              name='prix_january'
              value=''
              label='Janvier'
              component={Form.Input}
              type='number'
              step='0.01'
            />
            <SemanticFloatField
              name='prix_february'
              value=''
              label='Février'
              component={Form.Input}
              type='number'
              step='0.01'
            />
            <SemanticFloatField
              name='prix_march'
              value=''
              label='Mars'
              component={Form.Input}
              type='number'
              step='0.01'
            />
            <SemanticFloatField
              name='prix_april'
              value=''
              label='Avril'
              component={Form.Input}
              type='number'
              step='0.01'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <SemanticFloatField
              name='prix_may'
              value=''
              label='Mai'
              component={Form.Input}
              type='number'
              step='0.01'
            />
            <SemanticFloatField
              name='prix_june'
              value=''
              label='Juin'
              component={Form.Input}
              type='number'
              step='0.01'
            />
            <SemanticFloatField
              name='prix_july'
              value=''
              label='Juillet'
              component={Form.Input}
              type='number'
              step='0.01'
            />
            <SemanticFloatField
              name='prix_august'
              value=''
              label='Août'
              component={Form.Input}
              type='number'
              step='0.01'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <SemanticFloatField
              name='prix_september'
              value=''
              label='Septembre'
              component={Form.Input}
              type='number'
              step='0.01'
            />
            <SemanticFloatField
              name='prix_october'
              value=''
              label='Octobre'
              component={Form.Input}
              type='number'
              step='0.01'
            />
            <SemanticFloatField
              name='prix_november'
              value=''
              label='Novembre'
              component={Form.Input}
              type='number'
              step='0.01'
            />
            <SemanticFloatField
              name='prix_december'
              value=''
              label='Décembre'
              component={Form.Input}
              type='number'
              step='0.01'
            />
          </Form.Group>

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Créer le marché
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default MarcheFormComponent;
