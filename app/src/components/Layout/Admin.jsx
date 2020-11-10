import React, { useState } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import cn from 'classnames';
import { Transition } from '@headlessui/react';
import routes from 'routes';
import { JWT_STORAGE_KEY } from 'constants/index';

function AdminLayout() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);

  function renderSidebar() {
    return routes
      .filter((route) => route.isSidebar)
      .map((route) => (
        <Link
          to={route.path}
          className={cn(
            'px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
            { block: isOpenMenuMobile },
          )}
          key={route.path}
        >
          {route.name}
        </Link>
      ));
  }

  function toggleOpenDropdown() {
    setIsOpenDropdown(!isOpenDropdown);
  }

  function toggleMenuMobile() {
    setIsOpenMenuMobile(!isOpenMenuMobile);
  }

  function signout() {
    localStorage.removeItem(JWT_STORAGE_KEY);
  }

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                    alt="Workflow logo"
                  />
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {renderSidebar()}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                  aria-label="Notifications"
                  type="button"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <div className="ml-3 relative">
                  <div>
                    <button
                      className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                      type="button"
                      onClick={toggleOpenDropdown}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                  <Transition
                    show={isOpenDropdown}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    {(ref) => (
                      <div
                        ref={ref}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                      >
                        <div
                          className="py-1 rounded-md bg-white shadow-xs"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={toggleOpenDropdown}
                          >
                            Your Profile
                          </Link>

                          <Link
                            to="/setting"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Settings
                          </Link>

                          <Link
                            to="/signin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={signout}
                          >
                            Sign out
                          </Link>
                        </div>
                      </div>
                    )}
                  </Transition>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                type="button"
                onClick={toggleMenuMobile}
              >
                <svg
                  className={cn(
                    'block h-6 w-6',
                    isOpenMenuMobile ? 'hidden' : 'block',
                  )}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={cn(
                    'block h-6 w-6',
                    isOpenMenuMobile ? 'block' : 'hidden',
                  )}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={cn('md:hidden', isOpenMenuMobile ? 'block' : 'hidden')}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {renderSidebar()}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 space-x-3">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Link>
              </div>
              <div className="space-y-1">
                <div className="text-base font-medium leading-none text-white">
                  Tom Cook
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  tom@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                onClick={toggleOpenDropdown}
              >
                Your Profile
              </Link>

              <Link
                to="/setting"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Settings
              </Link>

              <Link
                to="/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                onClick={signout}
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="rounded-lg h-96">
            <Switch>
              {routes.map((route) => (
                <Route
                  path={route.path}
                  component={route.component}
                  key={route.path}
                />
              ))}
              <Redirect from="*" to="/" />
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
