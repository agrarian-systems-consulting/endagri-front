import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import typeVenteOptions from '../../../app/data/typeVenteOptions';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';

const MarcheFormComponent = () => {
  let history = useHistory();
  let { id } = useParams();

  const { addToast } = useToasts();
  // Faire un get pour récupérer la liste des options en lien avec la production en cours
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/produits`);

      setProduits(res.data);
    };

    fetchData();
  }, [id]);

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    id_produit: Yup.number().required('Le produit est obligatoire'),
    localisation: Yup.string().required('La localisation est obligatoire'),
    type_marche: Yup.string().required('Le type de vente est obligatoire'),
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
        id_produit: null,
        localisation: '',
        type_marche: '',
        prix_january: 0.0,
        prix_february: 0.0,
        prix_march: 0.0,
        prix_april: 0.0,
        prix_may: 0.0,
        prix_june: 0.0,
        prix_july: 0.0,
        prix_august: 0.0,
        prix_september: 0.0,
        prix_october: 0.0,
        prix_november: 0.0,
        prix_december: 0.0,
      }}
      // Handle form validation
      validationSchema={validationSchema}
      // Handle form submit
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post(`${process.env.REACT_APP_API_URI}/marche`, values)
          .then((res) => {
            console.log(res);
            addToast('Le marché a bien été créé', {
              appearance: 'success',
              autoDismiss: true,
            });

            // Rediriger vers la page de la fiche
            history.push(`/marche/${res.data.id}`);
          })
          .catch((err) => {
            console.log(err);
            addToast('Il y a eu une erreur pendant la création du marché', {
              appearance: 'success',
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
            name='type_marche'
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
