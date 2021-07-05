import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button, Dropdown, Nav, Navbar } from '@themesberg/react-bootstrap';
import NavItem from 'components/SideBar/nav-item';
import { createStructuredSelector } from 'reselect';
import {
  makeIsLoadingSelector,
  makeIsLoggedSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';
import { useSelector } from 'react-redux';
import { checkPermissionForComponent } from 'utils/permission';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  isLogged: makeIsLoggedSelector(),
  isLoading: makeIsLoadingSelector(),
});

const Sidebar = () => {
  const { isLogged, user } = useSelector(stateSelector);
  const [show, setShow] = useState(false);
  const [sideBar, setSideBar] = useState([]);
  const showClass = show ? 'show' : '';

  const onCollapse = () => setShow(!show);

  useEffect(() => {
    setSideBar([]);
  }, []);

  if (!isLogged) {
    return <></>;
  }

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand className="me-lg-5" as={Link} to="/"></Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4"></div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button
                    as={Link}
                    variant="secondary"
                    size="xs"
                    to="/"
                    className="text-dark"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{' '}
                    Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              {sideBar.map((component) => (
                <React.Fragment key={component.key}>
                  {checkPermissionForComponent(user.role, component) ? (
                    <NavItem
                      title={component.name}
                      link={component.path}
                      icon={component.icon}
                      setShow={setShow}
                    />
                  ) : (
                    ''
                  )}
                </React.Fragment>
              ))}

              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

export default Sidebar;
