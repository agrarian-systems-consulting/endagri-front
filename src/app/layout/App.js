import React, { Fragment } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Navbar from '../nav/Navbar';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import CreateAnalysePage from '../../pages/analyses/createAnalyse/CreateAnalysePage';
import ListAnalysesPage from '../../pages/analyses/listAnalyses/ListAnalysesPage';
import ReadAnalysePage from '../../pages/analyses/readAnalyse/ReadAnalysePage';
import ListFichesPage from '../../pages/fiches/list/ListFichesPage';
import CreateFichePage from '../../pages/fiches/create/CreateFichePage';
import ReadFichePage from '../../pages/fiches/read/ReadFichePage';
import UpdateFichePage from '../../pages/fiches/update/UpdateFichePage';
import ListMarchesPage from '../../pages/marches/list/ListMarchesPage';
import CreateMarchePage from '../../pages/marches/create/CreateMarchePage';
import ReadMarchePage from '../../pages/marches/read/ReadMarchePage';
import UpdateMarchePage from '../../pages/marches/update/UpdateMarchePage';
import ListProductionsPage from '../../pages/productions/list/ListProductionsPage';
import CreateProductionPage from '../../pages/productions/create/CreateProductionPage';
import ReadProductionPage from '../../pages/productions/read/ReadProductionPage';
import UpdateProductionPage from '../../pages/productions/update/UpdateProductionPage';
import UpdateAnalysePage from '../../pages/analyses/updateAnalyse/UpdateAnalysePage';
import DeleteAnalysePage from '../../pages/analyses/deleteAnalyse/DeleteAnalysePage';
import DeleteFichePage from '../../pages/fiches/delete/DeleteFichePage';
import DeleteMarchePage from '../../pages/marches/delete/DeleteMarchePage';
import DeleteProductionPage from '../../pages/productions/delete/DeleteProductionPage';
import ReadFicheLibrePage from '../../pages/analyses/readFicheLibre/ReadFicheLibrePage';
import ReadFluxMoisReelsParFichesLibres from '../../pages/analyses/readRapportAnalyse/ReadFluxMoisReelsParFichesLibres';
import AccueilPage from '../../pages/accueil/AccueilPage';
import PrivateRoute from '../auth/PrivateRoute';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Container className='main'>
        <Switch>
          <Route exact path='/' component={AccueilPage} />
          <PrivateRoute exact path='/analyses' component={ListAnalysesPage} />
          <Route exact path='/analyse/create' component={CreateAnalysePage} />
          <Route exact path='/analyse/:id' component={ReadAnalysePage} />
          <Route
            exact
            path='/analyse/:id/flux_mois_reels_par_fiches_libres'
            component={ReadFluxMoisReelsParFichesLibres}
          />
          <Route
            exact
            path='/analyse/:id/fiche-technique-libre/:id_ftl'
            component={ReadFicheLibrePage}
          />
          <Route
            exact
            path='/analyse/:id/update'
            component={UpdateAnalysePage}
          />
          <Route
            exact
            path='/analyse/:id/delete'
            component={DeleteAnalysePage}
          />
          <Route exact path='/fiches' component={ListFichesPage} />
          <Route exact path='/fiche/create' component={CreateFichePage} />
          <Route exact path='/fiche/:id' component={ReadFichePage} />
          <Route exact path='/fiche/:id/update' component={UpdateFichePage} />
          <Route exact path='/fiche/:id/delete' component={DeleteFichePage} />
          <Route exact path='/marches' component={ListMarchesPage} />
          <Route exact path='/marche/create' component={CreateMarchePage} />
          <Route exact path='/marche/:id' component={ReadMarchePage} />
          <Route exact path='/marche/:id/update' component={UpdateMarchePage} />
          <Route exact path='/marche/:id/delete' component={DeleteMarchePage} />
          <Route exact path='/productions' component={ListProductionsPage} />
          <Route
            exact
            path='/production/create'
            component={CreateProductionPage}
          />
          <Route exact path='/production/:id' component={ReadProductionPage} />
          <Route
            exact
            path='/production/:id/update'
            component={UpdateProductionPage}
          />
          <Route
            exact
            path='/production/:id/delete'
            component={DeleteProductionPage}
          />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
