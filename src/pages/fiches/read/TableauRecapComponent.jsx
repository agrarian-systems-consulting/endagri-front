import React from 'react';
import { Segment } from 'semantic-ui-react';
import formatMoney from '../../../app/utils/formatMoney';

const TableauRecapComponent = ({ fiche }) => {
  const sommeDepensesFiche = (fiche) => {
    let total = 0;
    if (fiche.activites !== undefined) {
      fiche.activites.forEach((activite) => {
        if (activite.depenses !== undefined) {
          activite.depenses.forEach((depense) => {
            total += depense.montant;
          });
        }
      });
    }

    return total;
  };
  return (
    <Segment>
      <b>Total des dépenses</b> {formatMoney(sommeDepensesFiche(fiche))}
    </Segment>
  );
};

export default TableauRecapComponent;
