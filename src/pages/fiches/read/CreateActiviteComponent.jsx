import React from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';

const CreateActiviteComponent = () => {
  return (
    <Segment>
      <Form>
        <Form.Field>
          <label>Libelle</label>
          <input placeholder='libelle' />
        </Form.Field>
        <Form.Field>
          <label>Mois calendaire</label>
          <input placeholder='mois' />
        </Form.Field>
        <Form.Field>
          <label>Mois relatif</label>
          <input placeholder='mois_relatif' />
        </Form.Field>
        <p>Dépenses</p>
        <Button color='blue' type='submit'>
          Ajouter
        </Button>
      </Form>
    </Segment>
  );
};

export default CreateActiviteComponent;
