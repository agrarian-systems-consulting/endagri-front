import React, { Fragment } from 'react';
import {
  Grid,
  Segment,
  List,
  Label,
  Table,
  Button,
  Divider,
  Breadcrumb,
  Icon,
} from 'semantic-ui-react';
import { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import ProduitFormComponent from './ProduitFormComponent';
import update from 'immutability-helper';

const ReadProductionPage = () => {
  const { id } = useParams();
  const [isOpenForm, setisOpenForm] = useState(false);

  const { addToast } = useToasts();

  const [production, setProduction] = useState({
    id: id,
    libelle: 'Blé dur',
    type_production: 'Culture annuelle',
    produits: [
      {
        id: 1,
        libelle: 'Paille de blé dur',
        unite: 'tonne de matière sèche',
      },
      {
        id: 2,
        libelle: 'Grains de blé dur',
        unite: 'quintal',
      },
    ],
  });

  const postProduit = (produit) => {
    produit.id_production = id;

    // axios.post
    let updatedProduction = update(production, {
      produits: {
        $push: [produit],
      },
    });

    setProduction(updatedProduction);

    addToast('Le produit a bien été créé', {
      appearance: 'success',
      autoDismiss: true,
    });
  };

  const deleteProduit = (id_produit) => {
    // axios.delete

    let updatedProduction = update(production, {
      produits: {
        $apply: (produits) =>
          produits.filter((produit) => {
            return produit.id !== id_produit;
          }),
      },
    });

    setProduction(updatedProduction);

    addToast('Le produit a bien été supprimé', {
      appearance: 'success',
      autoDismiss: true,
    });
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <NavLink to='/productions'>Productions</NavLink>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>{production.libelle}</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={8}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>{production.libelle} </h5>
            </Segment>
            <Segment attached='bottom'>
              <h5>Catégorie de production</h5>
              <Label tag>{production.type_production}</Label>
              <h5>Produits</h5>
              {production.produits.length === 0 ? (
                <p>Aucun produit associé pour le moment...</p>
              ) : (
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Nom du produit</Table.HeaderCell>
                      <Table.HeaderCell>Unité</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {production.produits &&
                      production.produits.map((produit) => {
                        return (
                          <Table.Row>
                            <Table.Cell>{produit.libelle}</Table.Cell>
                            <Table.Cell>{produit.unite}</Table.Cell>
                            <Table.Cell textAlign='center'>
                              <Button
                                size='mini'
                                icon
                                basic
                                circular
                                onClick={() => {
                                  deleteProduit(produit.id);
                                }}
                              >
                                <Icon name='trash' />
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                  </Table.Body>
                </Table>
              )}
              {isOpenForm ? (
                <Button
                  onClick={() => {
                    setisOpenForm(false);
                  }}
                >
                  Annuler
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setisOpenForm(true);
                  }}
                  color='teal'
                >
                  Ajouter un produit
                </Button>
              )}

              {isOpenForm ? (
                <Fragment>
                  <Divider />
                  <ProduitFormComponent postProduit={postProduit} />
                </Fragment>
              ) : null}
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={8}>
          {/* <Button negative floated='right'>
            Supprimer cette production
          </Button> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadProductionPage;
