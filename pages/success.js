import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { HiCheckCircle } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { Footer, Header } from '../components';
import { clearCart } from '../slices/cartSlice';

export default function Success({ successInfo: { name, status } }) {
  const route = useRouter();
  const dispatch = useDispatch();
  if (status === 200) {
    dispatch(clearCart());
  }
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Amazon - Success</title>
        <meta name="description" content="Created for learning purpose" />
        <link rel="icon" href="/amazon-icon.png" />
      </Head>
      <Header />
      <main className="bg-white max-w-screen-xl mx-auto p-10">
        <div className="flex items-center mb-3">
          <HiCheckCircle className="md:text-4xl text-3xl text-green-500" />
          <h2 className="text-xl md:text-3xl ml-3">
            Thank you {name}, your order has been confirmed!
          </h2>
        </div>
        <p>
          Thank you for shopping with us. We'll send a confirmation once your
          item has been shipped, if you would like to check the status of your
          order(s) please press the link below
        </p>
        <button
          className="button w-full mt-6"
          type="button"
          onClick={() => route.push('/orders')}
        >
          Go to my orders
        </button>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const res = await axios.get(
    `${process.env.HOST}/api/payment-success?session_id=${query.session_id}`
  );
  const successInfo = {
    name: res.data,
    status: res.status,
  };

  return {
    props: { successInfo },
  };
}
