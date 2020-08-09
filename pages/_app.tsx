import React from 'react';
import { AppProps } from 'next/app';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line
  return <Component {...pageProps} />;
}
