import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { PropsData } from '../lib/types';

type Props = { allPostsData: PropsData[] };
export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome !</title>
      </Head>
      <h1>Hi all</h1>
      <ul>
        <li>
          <Link href="/account/login">Login page</Link>
        </li>
        <li>
          <Link href="/briques">Briques</Link>
        </li>
      </ul>
    </div>
  );
}
