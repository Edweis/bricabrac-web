import React from 'react';
import { AppProps } from 'next/app';
import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from '../components/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* eslint-disable-next-line */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
