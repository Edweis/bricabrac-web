import React from 'react';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bootstrap-styles.scss';
import '../styles/global.scss';
import AuthProvider from '../components/AuthProvider';
import WithAlerts from '../components/WithAlerts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <WithAlerts>
        {/* eslint-disable-next-line */}
      <Component {...pageProps} />
      </WithAlerts>
    </AuthProvider>
  );
}
