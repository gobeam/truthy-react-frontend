import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faCog,
  faFileAlt,
  faHandHoldingUsd,
  faSignOutAlt,
  faTable,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Dropdown,
  Image,
  Nav,
  Navbar,
} from '@themesberg/react-bootstrap';
import ReactHero from 'assets/img/technologies/react-hero-logo.svg';
import ProfilePicture from 'assets/img/team/profile-picture-3.jpg';
import NavItem from 'components/SideBar/nav-item';
import CollapsableNavItem from 'components/SideBar/collapsible-nav-item';
import { createStructuredSelector } from 'reselect';
import {
  makeIsLoadingSelector,
  makeIsLoggedSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';
import { useSelector } from 'react-redux';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  isLogged: makeIsLoggedSelector(),
  isLoading: makeIsLoadingSelector(),
});

function Sidebar() {
  const { isLogged } = useSelector(stateSelector);
  const [show, setShow] = useState(false);
  const showClass = show ? 'show' : '';

  const onCollapse = () => setShow(!show);
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
        <Navbar.Brand className="me-lg-5" as={Link} to="/">
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
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
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={ProfilePicture}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
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
              <NavItem
                title="Volt React"
                link="/"
                image={ReactHero}
                setShow={setShow}
              />

              <NavItem
                title="Overview"
                link="/"
                icon={faChartPie}
                setShow={setShow}
              />
              <NavItem
                setShow={setShow}
                title="Transactions"
                icon={faHandHoldingUsd}
                link="/"
              />
              <NavItem
                title="Settings"
                icon={faCog}
                link="/"
                setShow={setShow}
              />

              <CollapsableNavItem
                eventKey="tables/"
                title="Tables"
                icon={faTable}
              >
                <NavItem title="Bootstrap Table" link="/" setShow={setShow} />
              </CollapsableNavItem>

              <CollapsableNavItem
                eventKey="examples/"
                title="Page Examples"
                icon={faFileAlt}
              >
                <NavItem title="Sign In" link="/" setShow={setShow} />
                <NavItem title="Sign Up" link="/" setShow={setShow} />
                <NavItem title="Forgot password" link="/" setShow={setShow} />
                <NavItem title="Reset password" link="/" setShow={setShow} />
                <NavItem title="Lock" link="/" setShow={setShow} />
                <NavItem title="404 Not Found" link="/" setShow={setShow} />
                <NavItem title="500 Server Error" link="/" setShow={setShow} />
              </CollapsableNavItem>

              <NavItem
                setShow={setShow}
                external
                title="Plugins"
                link="https://demo.themesberg.com/volt-pro-react/#/plugins/charts"
                target="_blank"
                badgeText="Pro"
                icon={faChartPie}
              />

              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
}

export default Sidebar;
