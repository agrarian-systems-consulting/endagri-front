import Axios from 'axios';
import update from 'immutability-helper';
import React, { Fragment, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import {
  Breadcrumb,
  Button,
  Divider,
  Grid,
  Icon,
  Label,
  Placeholder,
  Segment,
  Table,
} from 'semantic-ui-react';
import ProduitFormComponent from './ProduitFormComponent';
import capitalize from '../../../app/utils/capitalize';

const ReadProductionPage = () => {
  const { id } = useParams();
  const [isOpenForm, setisOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();

  const [production, setProduction] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_URI}/production/${id}`
      );
      setProduction(res.data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const postProduit = (produit) => {
    produit.id_production = id;

    Axios.post(`${process.env.REACT_APP_API_URI}/produit`, produit).then(
      (res) => {
        produit.id = res.data.id;

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
      },
      (err) => {
        addToast(err, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    );
  };

  const deleteProduit = (id_produit) => {
    let updatedProduction = update(production, {
      produits: {
        $apply: (produits) =>
          produits.filter((produit) => {
            return produit.id !== id_produit;
          }),
      },
    });

    setProduction(updatedProduction);

    Axios.delete(`${process.env.REACT_APP_API_URI}/produit/${id_produit}`).then(
      (res) => {
        addToast('Le produit a bien été supprimé', {
          appearance: 'success',
          autoDismiss: true,
        });
      },
      (err) => {
        addToast(err, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    );
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
          {loading ? (
            <Segment.Group>
              <Segment attached='top'>
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </Segment>
              <Segment clearing attached='bottom'>
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              </Segment>
            </Segment.Group>
          ) : (
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
                          if (produit.id !== null) {
                            return (
                              <Table.Row key={produit.id}>
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
                          }
                        })}
                    </Table.Body>
                  </Table>
                )}
                {/* <pre>{JSON.stringify(production, true, 2)}</pre> */}
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
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <Button negative as={NavLink} to={`/production/${id}/delete`}>
            Supprimer cette production
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadProductionPage;
