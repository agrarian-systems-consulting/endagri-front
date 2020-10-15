import React, { Fragment, useContext, useState } from 'react';
import { Menu, Button, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import authService from '../auth/old_auth.service';
import { UserContext } from '../auth/UserContext';
import useUser from '../auth/useUser';

const Navbar = () => {
  const { utilisateur, logoutUtilisateur } = useUser();

  return (
    <Fragment>
      {!utilisateur.matricule ? (
        <Menu inverted fixed='top'>
          <Menu.Item name='Endagri' header as={NavLink} to='/' exact />
          {/* <Menu.Item position='right'>
            <Button basic inverted content='Se connecter' as={NavLink} to='/' />
          </Menu.Item> */}
        </Menu>
      ) : (
        <Menu inverted fixed='top'>
          {[
            'SUPER_ADMIN',
            'ADMINISTRATEUR_ENDAGRI',
            'AGRONOME_REGIONAL',
            'SUPERVISEUR_AGENCE',
            'GESTIONNAIRE_DE_PORTEFEUILLE',
          ].includes(utilisateur.role) && (
            <Menu.Item name='Analyses' as={NavLink} to='/analyses' />
          )}
          {[
            'SUPER_ADMIN',
            'ADMINISTRATEUR_ENDAGRI',
            'AGRONOME_REGIONAL',
            'SUPERVISEUR_AGENCE',
          ].includes(utilisateur.role) && (
            <Menu.Item name='Fiches techniques' as={NavLink} to='/fiches' />
          )}
          {[
            'SUPER_ADMIN',
            'ADMINISTRATEUR_ENDAGRI',
            'AGRONOME_REGIONAL',
          ].includes(utilisateur.role) && (
            <Menu.Item name='Marchés' as={NavLink} to='/marches' />
          )}
          {[
            'SUPER_ADMIN',
            'ADMINISTRATEUR_ENDAGRI',
            'AGRONOME_REGIONAL',
          ].includes(utilisateur.role) && (
            <Menu.Item name='Productions' as={NavLink} to='/productions' />
          )}
          {[
            'SUPER_ADMIN',
            'ADMINISTRATEUR_ENDAGRI',
            'AGRONOME_REGIONAL',
            'SUPERVISEUR_AGENCE',
            'GESTIONNAIRE_DE_PORTEFEUILLE',
          ].includes(utilisateur.role) && (
            <Menu.Item>
              <Button
                as={NavLink}
                to='/analyse/create'
                floated='right'
                color='yellow'
                content='Nouvelle analyse'
              />
            </Menu.Item>
          )}

          {/* <Menu.Item position='right'>
            <Dropdown
              pointing='top right'
              text={`${utilisateur.matricule} - ${utilisateur.role}`}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  as={NavLink}
                  to={`/analyses`}
                  text='Mes analyses'
                  icon='user'
                />
                <Dropdown.Item
                  onClick={() => {
                    logoutUtilisateur();
                  }}
                  text='Se déconnecter'
                  icon='power'
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item> */}
          <Menu.Item
            position='right'
            icon='user'
            name={`${utilisateur.matricule} - ${utilisateur.role}`}
          />

          <Menu.Item position='right'>
            <Button
              basic
              inverted
              icon='power'
              content='Se déconnecter'
              onClick={() => {
                logoutUtilisateur();
              }}
            />
          </Menu.Item>
        </Menu>
      )}
    </Fragment>
  );
};

export default Navbar;
