import React from 'react';
import Head from 'next/head';
import Nav from './nav';

const Layout = ({ title, children }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Nav />
    {children}
  </div>
)

export default Layout;