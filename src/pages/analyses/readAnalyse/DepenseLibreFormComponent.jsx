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
import SemanticIntegerField from '../../../app/utils/forms/SemanticIntegerField';

const DepenseLibreFormComponent = ({ addDepenseLibre }) => {
  // Form validation handled with Yup
  const validationSchema = Yup.object({
    montant: Yup.number()
      .positive()
      .required('Le montant de la dépense est obligatoire'),
    libelle: Yup.string().required('Le libellé de la dépense est obligatoire'),
    mois_reel: Yup.string().required('La date de dépense est obligatoire'),
  });

  return (
    <Formik
      initialValues={{
        mois_reel: new Date(),
        libelle: '',
        montant: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        addDepenseLibre(values);
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
            name='libelle'
            value=''
            label='Libellé de la dépense'
            component={Form.Input}
          />
          <SemanticIntegerField
            name='montant'
            value={0}
            label='Montant de la dépense'
            component={Form.Input}
            type='number'
          />
          <Form.Field>
            <label>Date de dépense</label>
            <DatePicker
              selected={values.mois_reel}
              dateFormat='MM/yyyy'
              className='form-control'
              name='mois_reel'
              showMonthYearPicker
              onChange={(date) => setFieldValue('mois_reel', date)}
            />
          </Form.Field>

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Ajouter cette dépense
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default DepenseLibreFormComponent;
