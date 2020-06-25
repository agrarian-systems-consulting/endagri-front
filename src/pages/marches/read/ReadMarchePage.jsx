import React, { useState } from 'react';
import { Grid, Breadcrumb, Segment, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import formatMoney from '../../../app/utils/formatMoney';

const ReadMarchePage = () => {
  const [marche, setMarche] = useState({
    id: 1,
    id_produit: 3,
    libelle_production: 'Bovins laitiers race Tarantaise',
    libelle_produit: 'Lait',
    unite: 'Litre',
    localisation: 'Bizerte',
    type_vente: 'Vente usine',
    prix_january: 100,
    prix_february: 110,
    prix_march: 110,
    prix_april: 120,
    prix_may: 115,
    prix_june: 130,
    prix_july: 135,
    prix_august: 90,
    prix_september: 40,
    prix_october: 40,
    prix_november: 80,
    prix_december: 95,
  });

  const {
    id,
    libelle_production,
    libelle_produit,
    unite,
    prix_january,
    prix_february,
    prix_march,
    prix_april,
    prix_may,
    prix_june,
    prix_july,
    prix_august,
    prix_september,
    prix_october,
    prix_november,
    prix_december,
  } = marche;

  // TODO useEffect pour peupler marche

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to='/marches'>Marchés</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>
              {marche.libelle_production} <Breadcrumb.Divider />
              {marche.libelle_produit} <Breadcrumb.Divider />
              {marche.type_vente} <Breadcrumb.Divider />
              {marche.localisation}
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={10}>
          <Segment>
            <List>
              <List.Item>
                Prix Janvier : {formatMoney(prix_january)}/{unite}
              </List.Item>
              <List.Item>
                Prix Février : {formatMoney(prix_february)}/{unite}
              </List.Item>
              <List.Item>
                Prix Mars : {formatMoney(prix_march)}/{unite}
              </List.Item>
              <List.Item>
                Prix Avril : {formatMoney(prix_april)}/{unite}
              </List.Item>
              <List.Item>
                Prix Mai : {formatMoney(prix_may)}/{unite}
              </List.Item>
              <List.Item>
                Prix Juin : {formatMoney(prix_june)}/{unite}
              </List.Item>
              <List.Item>
                Prix Juillet : {formatMoney(prix_july)}/{unite}
              </List.Item>
              <List.Item>
                Prix Août : {formatMoney(prix_august)}/{unite}
              </List.Item>
              <List.Item>
                Prix Septembre : {formatMoney(prix_september)}/{unite}
              </List.Item>
              <List.Item>
                Prix Octobre : {formatMoney(prix_october)}/{unite}
              </List.Item>
              <List.Item>
                Prix Novembre : {formatMoney(prix_november)}/{unite}
              </List.Item>
              <List.Item>
                Prix Décembre : {formatMoney(prix_december)}/{unite}
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment attached='top'>
              <h5>Informations sur le marché</h5>
            </Segment>
            <Segment attached='bottom'>
              <List>
                <List.Item>Production : {marche.libelle_production}</List.Item>
              </List>
              <List>
                <List.Item>Produit : {marche.libelle_produit}</List.Item>
              </List>
              <List>
                <List.Item>Type de vente : {marche.type_vente}</List.Item>
              </List>
              <List>
                <List.Item>Localisation : {marche.localisation}</List.Item>
              </List>
              <Button>Modifier</Button>
            </Segment>
          </Segment.Group>
          <Button negative floated='right'>
            Supprimer
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ReadMarchePage;
