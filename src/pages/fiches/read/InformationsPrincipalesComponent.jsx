import React, { Fragment } from 'react';
import { Grid, Segment, List, Label, Icon } from 'semantic-ui-react';
import getMois from '../../../app/utils/getMois';
const InformationsPrincipalesComponent = ({ fiche }) => {
  return (
    <Fragment>
      <h5>Détail de la fiche technique </h5>

      <Segment learing>
        <List>
          <List.Item>
            <b>Identifiant</b> Fiche {fiche.id}
          </List.Item>
          <List.Item>
            <b>Libellé</b> {fiche.libelle}
          </List.Item>
          <List.Item>
            <b>Catégorie</b> <Label>{fiche.type_production}</Label>
          </List.Item>
          {fiche.commentaire && (
            <List.Item>
              <b>Commentaire</b> <p>{fiche.commentaire}</p>
            </List.Item>
          )}
        </List>
        {
          {
            'Culture annuelle': (
              <List.Item>
                <Icon color='grey' name='calendar check outline' />
                Semis possible entre {getMois(fiche.ini_debut)} et{' '}
                {getMois(fiche.ini_fin)}
              </List.Item>
            ),
            'Elevage naisseur': (
              <List.Item>
                <Icon color='grey' name='calendar check outline' />
                Mise-bas possible entre {getMois(fiche.ini_debut)} et{' '}
                {getMois(fiche.ini_fin)}
              </List.Item>
            ),
          }[fiche.type_production]
        }

        {
          {
            'Culture annuelle': (
              <small>Les valeurs sont données pour un hectare</small>
            ),
            'Culture pérenne': (
              <small>Les valeurs sont données pour un hectare</small>
            ),
          }[fiche.type_production]
        }

        {/* <Button floated='right' >
              Modifier
            </Button> */}
      </Segment>
    </Fragment>
  );
};

export default InformationsPrincipalesComponent;
