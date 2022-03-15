import Head from 'next/head';
import { Header } from '../components';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Amazon</title>
        <meta name="description" content="Created for learning purpose" />
        <link rel="icon" href="/amazon-icon.png" />
      </Head>
      <Header />
    </div>
  );
}
