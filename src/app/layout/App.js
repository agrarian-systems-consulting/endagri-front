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

function App() {
  return (
    <Fragment>
      <Navbar />
      <Container className='main'>
        <Switch>
          <Route exact path='/analyses' component={ListAnalysesPage} />
          <Route exact path='/analyse/create' component={CreateAnalysePage} />
          <Route path='/analyse/:id' component={ReadAnalysePage} />
          <Route path='/analyse/:id/update' component={ReadAnalysePage} />
          <Route exact path='/fiches' component={ListFichesPage} />
          <Route exact path='/fiche/create' component={CreateFichePage} />
          <Route path='/fiche/:id' component={ReadFichePage} />
          <Route path='/fiche/:id/update' component={UpdateFichePage} />
          <Route exact path='/marches' component={ListMarchesPage} />
          <Route exact path='/marche/create' component={CreateMarchePage} />
          <Route path='/marche/:id' component={ReadMarchePage} />
          <Route path='/marche/:id/update' component={UpdateMarchePage} />
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
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
