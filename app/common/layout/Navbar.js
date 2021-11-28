import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';

function Navbar() {
  return (
    <div className="navbar">
      <Header className="d-flex w-100 headers">
        <div className="logos"> Truthy</div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
          className="w-100 ml-auto"
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Login</Menu.Item>
        </Menu>
      </Header>
    </div>
  );
}

export default Navbar;
