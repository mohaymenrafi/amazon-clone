import axios from 'axios';
import Head from 'next/head';
import { Banner, Footer, Header, ProductsFeed } from '../components';

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Amazon</title>
        <meta name="description" content="Created for learning purpose" />
        <link rel="icon" href="/amazon-icon.png" />
      </Head>
      <Header />
      <main className=" max-w-screen-2xl mx-auto bg-gray-100">
        <Banner />
        <ProductsFeed products={products} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('https://fakestoreapi.com/products');
  const products = res.data;

  return {
    props: {
      products,
    },
  };
}
