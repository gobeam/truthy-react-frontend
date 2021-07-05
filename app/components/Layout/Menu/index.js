import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuList } from 'components/Layout/Menu/list';
import { createStructuredSelector } from 'reselect';
import {
  makeCollapsedSelector,
  makeDeviceSelector,
} from 'containers/App/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCollapseAction } from 'containers/App/actions';

const { SubMenu, Item } = Menu;

const stateSelector = createStructuredSelector({
  device: makeDeviceSelector(),
  collapsed: makeCollapsedSelector(),
});

const MenuComponent = () => {
  const dispatch = useDispatch();
  const [openKeys, setOpenkeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const { device, collapsed } = useSelector(stateSelector);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getTitle = (menu) => (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {menu.icon}
      <span>{menu.name}</span>
    </span>
  );

  const onMenuClick = (menu) => {
    if (menu.path === pathname) return;
    const { key, path } = menu;
    setSelectedKeys([key]);
    if (device !== 'DESKTOP') {
      dispatch(toggleCollapseAction(true));
    }
    navigate(path);
  };

  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenkeys(collapsed ? [] : [`/${pathname.split('/')[1]}`]);
  }, [collapsed, pathname]);

  const onOpenChange = (keys) => {
    const key = keys.pop();

    setOpenkeys(key ? [key] : []);
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      className="layout-page-sider-menu"
    >
      {menuList?.map((menu) =>
        menu.children ? (
          <SubMenu key={menu.path} title={getTitle(menu)}>
            {menu.children.map((child) => (
              <Item key={child.path} onClick={() => onMenuClick(child)}>
                {child.name}
              </Item>
            ))}
          </SubMenu>
        ) : (
          <Item key={menu.path} onClick={() => onMenuClick(menu)}>
            {getTitle(menu)}
          </Item>
        ),
      )}
    </Menu>
  );
};

export default MenuComponent;
