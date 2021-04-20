import React from 'react';
import { logoutAction } from 'containers/App/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeIsLoadingSelector,
  makeIsLoggedSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
} from '@themesberg/react-bootstrap';
import messages from 'components/Header/messages';
import { FormattedMessage } from 'react-intl';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  isLogged: makeIsLoggedSelector(),
  isLoading: makeIsLoadingSelector(),
});

function Header() {
  const dispatch = useDispatch();
  const { user, isLogged } = useSelector(stateSelector);
  const onLogout = () => dispatch(logoutAction());

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center" />
          {isLogged ? (
            <Nav className="align-items-center">
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                  <div className="media d-flex align-items-center text-black-50">
                    {user.image ? (
                      <Image
                        alt={user.name}
                        src={user.image || ''}
                        className="user-avatar md-avatar rounded-circle"
                      />
                    ) : (
                      <span>
                        {user.name
                          .split(' ')
                          .map((name) => name[0])
                          .join('')
                          .toUpperCase()}
                      </span>
                    )}
                    <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                      <span className="mb-0 font-small fw-bold">
                        {user.name}
                      </span>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                  <NavLink className="dropdown-item" to="/profile">
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                    <FormattedMessage {...messages.profile} />
                  </NavLink>
                  <NavLink className="dropdown-item" to="/settings">
                    <FontAwesomeIcon icon={faCog} className="me-2" />
                    <FormattedMessage {...messages.setting} />
                  </NavLink>
                  <Dropdown.Divider />
                  <Dropdown.Item className="fw-bold" onClick={onLogout}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="text-danger me-2"
                    />
                    <FormattedMessage {...messages.logout} />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            ''
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
