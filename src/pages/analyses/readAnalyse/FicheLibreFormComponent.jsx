import Axios from 'axios';
import { format } from 'date-fns';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import SemanticField from '../../../app/utils/forms/SemanticField';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FicheLibreFormComponent = ({ addFicheTechniqueLibre }) => {
  const [fichesTechniques, setFichesTechniques] = useState([]);

  useEffect(() => {
    Axios(`${process.env.REACT_APP_API_URI}/fiches`)
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
              onChange={(date) => setFieldValue('date_ini', date)}
            />
          </Form.Field>

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
            Ajouter cette production
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default FicheLibreFormComponent;
