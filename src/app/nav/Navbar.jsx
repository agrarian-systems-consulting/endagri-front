import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Menu inverted fixed='top'>
      <Menu.Item name='Endagri' header as={NavLink} to='/' exact />
      <Menu.Item
        name='Fiches techniques'
        as={NavLink}
        to='/fiches-techniques'
      />
      <Menu.Item name='Analyses' as={NavLink} to='/analyses' />
      <Menu.Item name='Marchés' as={NavLink} to='/marches' />
      <Menu.Item name='Productions' as={NavLink} to='/productions' />
      <Menu.Item>
        <Button
          as={NavLink}
          to='/analyse'
          floated='right'
          color='yellow'
          content='Nouvelle analyse'
        />
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
