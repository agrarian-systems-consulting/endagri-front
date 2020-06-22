import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const CreateVenteComponent = () => {
  return (
    <Segment>
      <Form>
        <Form.Field>
          <label>Libelle</label>
          <input placeholder='libelle' />
        </Form.Field>
        <Form.Field>
          <label>Rendement min.</label>
          <input placeholder='rendement_min' />
        </Form.Field>
        <Form.Field>
          <label>Rendement</label>
          <input placeholder='rendement' />
        </Form.Field>
        <Form.Field>
          <label>Rendement max.</label>
          <input placeholder='rendement_max' />
        </Form.Field>
        <Form.Field>
          <label>Mois relatif</label>
          <input placeholder='mois_relatif' />
        </Form.Field>
        <Form.Field>
          <label>Mois calendaire</label>
          <input placeholder='mois' />
        </Form.Field>
        <Button color='blue' type='submit'>
          Ajouter
        </Button>
      </Form>
    </Segment>
  );
};

export default CreateVenteComponent;
