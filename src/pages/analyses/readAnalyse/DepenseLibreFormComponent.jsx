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

const DepenseLibreFormComponent = ({ addDepenseLibre }) => {
  // Form validation handled with Yup
  const validationSchema = Yup.object({
    montant: Yup.number().required('Le montant de la dépenseest obligatoire'),
    libelle: Yup.string().required('Le libellé de la dépense est obligatoire'),
    date: Yup.string().required('La date de dépense est obligatoire'),
  });

  return (
    <Formik
      initialValues={{
        date: new Date(),
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
          <SemanticFloatField
            name='montant'
            value={0}
            label='Montant de la dépense'
            component={Form.Input}
            type='number'
            step={0.01}
          />
          <Form.Field>
            <label>Date de dépense</label>
            <DatePicker
              selected={values.date_ini}
              dateFormat='dd/MM/yyyy'
              className='form-control'
              name='date_ini'
              onChange={(date) => setFieldValue('date_ini', date)}
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
