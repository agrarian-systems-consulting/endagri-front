import { Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';
import { useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import authHeader from '../../../app/auth/auth-header';

const CoeffVenteFormComponent = ({ addCoeffVente }) => {
  const { id, id_ftl } = useParams();
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    Axios(
      `${process.env.REACT_APP_API_URI}/analyse/${id}/fiche-technique-libre/${id_ftl}/produits`,
      { headers: authHeader() }
    )
      .then((res) => {
        setProduits(res.data);
      })
      .catch((err) => {
        console.err(err);
      });
  }, [id, id_ftl]);

  // Construit un array d'object pour les options du select (Dropdown)
  const categoriesProduitsOptions = () => {
    let options = [];

    produits.forEach((p) => {
      options.push({
        key: p.id_marche,
        value: p.id_marche,
        text:
          p.libelle_produit + ' - ' + p.localisation + ' - ' + p.type_marche,
      });
    });

    return options;
  };

  // Retourne le rendement moyen pour le produit sélectionné
  const getRendement = (valeur) => {
    const selectedProduct = produits.filter(
      (prod) => prod.id_marche === valeur
    );

    return selectedProduct[0];
  };

  // Form validation handled with Yup
  const validationSchema = Yup.object({
    libelle_categorie: Yup.string().required('Ce champs est obligatoire'),
    // coeff_intraconsommation: Yup.number().required('Ce champs est obligatoire'),
  });

  return (
    <Formik
      initialValues={{
        libelle_categorie: '',
        coeff_intraconsommation: 0,
        coeff_autoconsommation: 0,
        coeff_rendement: 1,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        addCoeffVente(values);
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
            name='libelle_categorie'
            value=''
            label='Produit'
            component={Form.Dropdown}
            placeholder='Choisir un produit'
            fluid
            search
            selection
            clearable
            options={categoriesProduitsOptions()}
          />
          {/* <SemanticFloatField
            name='coeff_intraconsommation'
            value=''
            label="Part utilisée sur l'exploitation (pour d'autres cultures ou élevages)"
            component={Form.Input}
            type='number'
            min='0'
            max='1'
            step={0.01}
          /> */}
          <SemanticFloatField
            name='coeff_autoconsommation'
            value=''
            label='Part autoconsommée'
            component={Form.Input}
            type='number'
            min='0'
            max='1'
            step={0.01}
          />
          <SemanticFloatField
            name='coeff_rendement'
            value=''
            label='Rendement par rapport au rendement moyen'
            component={Form.Input}
            type='number'
            min='0.5'
            max='1.5'
            step={0.01}
          />
          {values.libelle_categorie && (
            <Fragment>
              <Message>
                <b>Rendement calculé</b>{' '}
                {parseFloat(
                  getRendement(values.libelle_categorie).rendement *
                    values.coeff_rendement
                ).toFixed(2)}{' '}
                <br />
              </Message>
              {getRendement(values.libelle_categorie).rendement *
                values.coeff_rendement >
                getRendement(values.libelle_categorie).rendement_max && (
                <Message color='yellow'>
                  <Message.Header>Attention</Message.Header>
                  Vous avez dépassé la limite maximale conseillée, une
                  notification sera faite de ce dépassement dans l'analyse
                </Message>
              )}
              {getRendement(values.libelle_categorie).rendement *
                values.coeff_rendement <
                getRendement(values.libelle_categorie).rendement_min && (
                <Message color='yellow'>
                  <Message.Header>Attention</Message.Header>
                  Vous avez dépassé la limite minimale conseillée, une
                  notification sera faite de ce dépassement dans l'analyse
                </Message>
              )}
            </Fragment>
          )}
          {values.libelle_categorie && (
            <Message info>
              <b>Rendement minimum</b>{' '}
              {parseFloat(
                getRendement(values.libelle_categorie).rendement_min
              ).toFixed(2)}{' '}
              <br />
              <b>Rendement moyen</b>{' '}
              {parseFloat(
                getRendement(values.libelle_categorie).rendement
              ).toFixed(2)}
              <br />
              <b>Rendement maximum</b>{' '}
              {parseFloat(
                getRendement(values.libelle_categorie).rendement_max
              ).toFixed(2)}
            </Message>
          )}
          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Ajouter
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre>
          <pre>
            values.libelle_categorie ={' '}
            {JSON.stringify(values.libelle_categorie, null, 2)}
          </pre>
          <pre>produits = {JSON.stringify(produits, null, 2)}</pre>
          <pre>
            getRendement ={' '}
            {JSON.stringify(getRendement(values.libelle_categorie), null, 2)}
          </pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default CoeffVenteFormComponent;
