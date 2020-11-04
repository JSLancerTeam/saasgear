import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes';
import apolloClient from './apollo';
import './tailwind.output.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <div className="relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
              <div className="lg:w-0 lg:flex-1">
                <Link to="/" className="flex">
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                    alt="Workflow"
                  />
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
                <Link
                  to="/dashboard"
                  className="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  to="/todo"
                  className="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                >
                  Todo
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
