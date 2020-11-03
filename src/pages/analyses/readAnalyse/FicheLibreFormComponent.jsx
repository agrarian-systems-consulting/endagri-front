import Axios from 'axios';
import { format, getDay, getMonth } from 'date-fns';
import { Formik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Button, Form, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import authHeader from '../../../app/auth/auth-header';
import capitalize from '../../../app/utils/capitalize';
import _ from 'lodash';
import getMois from '../../../app/utils/getMois';
const FicheLibreFormComponent = ({ addFicheTechniqueLibre }) => {
  const [fichesTechniques, setFichesTechniques] = useState([]);
  const [selectedFiche, setSelectedFiche] = useState({});

  useEffect(() => {
    Axios(`${process.env.REACT_APP_API_URI}/fiches`, { headers: authHeader() })
      .then((res) => {
        const fiches = _.orderBy(res.data, ['libelle'], ['asc']);
        setFichesTechniques(fiches);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Méthode pas clean mais fonctionelle
  const getSelectedFiche = (id_fiche) => {
    const selectedFiche = fichesTechniques.filter((fiche) => {
      return fiche.id === id_fiche;
    });
    setSelectedFiche(selectedFiche[0]);
    return selectedFiche[0];
  };

  // Permet de contraindre les valeurs autorisées de calendrier de semis/mise-bas
  const isWithinInterval = (date) => {
    const ini_debut = selectedFiche.ini_debut;
    const ini_fin = selectedFiche.ini_fin;
    const month = getMonth(date);

    if (ini_debut <= ini_fin) {
      // -1 est lié à un problème de date, pourrait être amélioré
      return month >= ini_debut - 1 && month <= ini_fin - 1;
    } else {
      return month >= ini_debut - 1 || month <= ini_fin - 1;
    }
  };

  // Construit un array d'object pour les options du select (Dropdown)
  const fichesTechniquesOptions = () => {
    let options = [];

    fichesTechniques.forEach((p) => {
      options.push({
        key: p.id,
        value: p.id,
        text: capitalize(p.libelle),
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
        date_ini: new Date(),
        coeff_surface_ou_nombre_animaux: 1,
        coeff_main_oeuvre_familiale: 0,
        coeff_ventes: [],
        coeff_depenses: [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        addFicheTechniqueLibre(values);
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
          {values.id_fiche_technique && (
            <Fragment>
              <SemanticFloatField
                name='coeff_surface_ou_nombre_animaux'
                value=''
                label="Surface en hectares ou nombre d'animaux"
                component={Form.Input}
                type='number'
                step={0.01}
              />
              <Form.Field>
                <label>Date de semis ou mise bas</label>
                <DatePicker
                  selected={values.date_ini}
                  dateFormat='dd/MM/yyyy'
                  className='form-control'
                  name='date_ini'
                  filterDate={isWithinInterval}
                  onChange={(date) => setFieldValue('date_ini', date)}
                />
              </Form.Field>
              <Message info>
                {' '}
                Période de démarrage possible de{' '}
                {getMois(
                  getSelectedFiche(values.id_fiche_technique).ini_debut
                )}{' '}
                à {getMois(getSelectedFiche(values.id_fiche_technique).ini_fin)}
              </Message>
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
            </Fragment>
          )}

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Ajouter cette production
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
          {/* <pre>
            selectedFiche =
            {JSON.stringify(
              getSelectedFiche(values.id_fiche_technique),
              null,
              2
            )}
          </pre>
          <pre>
            fichesTechniques = {JSON.stringify(fichesTechniques, null, 2)}
          </pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default FicheLibreFormComponent;
