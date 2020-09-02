import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Form } from 'semantic-ui-react';
import SemanticFloatField from '../../../app/utils/forms/SemanticFloatField';

const UpdateMarcheFormComponent = () => {
  // Hooks
  let history = useHistory();
  let { id } = useParams();
  const { addToast } = useToasts();

  const [marche, setMarche] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}/marche/${id}`
      );
      setMarche(res.data);
    };

    fetchData();
  }, [id]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={marche}
      // Handle form submit
      onSubmit={(values, { setSubmitting }) => {
        axios
          .put(`${process.env.REACT_APP_API_URI}/marche/${id}`, values)
          .then((res) => {
            addToast('Le marché a bien été mis à jour', {
              appearance: 'success',
              autoDismiss: true,
            });

            history.push(`/marche/${id}`);
          })
          .catch((err) => {
            addToast(err, {
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
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
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
          <Button as={NavLink} exact to={`/marche/${id}`}>
            Annuler
          </Button>

          <Button
            type='submit'
            color='blue'
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
          >
            Metre à jour les prix du marché
          </Button>
          {/* <pre>values = {JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default UpdateMarcheFormComponent;
