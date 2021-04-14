import React, { useState } from 'react';
import { changeAppFieldAction, logoutAction } from 'containers/App/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeIsLoadingSelector,
  makeIsLoggedSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';
import { NavLink } from 'react-router-dom';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  isLogged: makeIsLoggedSelector(),
  isLoading: makeIsLoadingSelector(),
});

function Header() {
  const dispatch = useDispatch();
  const { user, isLogged, userMenu } = useSelector(stateSelector);
  const onChangeFormField = (key, value) =>
    dispatch(changeAppFieldAction(key, value));
  const onLogout = () => dispatch(logoutAction());
  const [isOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 z-10 w-full">
      <div className="container mx-auto flex py-3  items-center">
        <NavLink
          className="text-gray-900 no-underline hover:no-underline font-extrabold text-xl"
          to="/dashboard"
        />
        <div className="ml-2 flex-grow items-center" />

        <nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } px-2 pt-2 pb-4 sm:flex sm:p-0 col-span-2 justify-end items-center`}
        >
          {isLogged ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  onChangeFormField('userMenu', !userMenu);
                  onChangeFormField('userNotification', false);
                }}
                className="relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 hover:border-orange-400 focus:outline-none focus:border-white"
              >
                {user.image ? (
                  <img
                    className="rounded-full"
                    alt={user.name}
                    src={user.image}
                  />
                ) : (
                  <div className="bg-orange-600 text-white rounded-full w-full h-full flex items-center justify-center">
                    {user.name
                      .split(' ')
                      .map((name) => name[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                )}
              </button>
              {userMenu ? (
                <>
                  <button
                    type="button"
                    onClick={() => onChangeFormField('userMenu', false)}
                    tabIndex="-1"
                    className="fixed inset-0 h-full w-full cursor-default focus:outline-none"
                  >
                    {' '}
                  </button>
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                    <NavLink
                      className="block px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white"
                      to="/profile"
                    >
                      Account settings
                    </NavLink>
                    <button
                      type="button"
                      className="block px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white"
                      onClick={onLogout}
                    >
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
