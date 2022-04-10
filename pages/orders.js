import Head from 'next/head';
import React, { useEffect } from 'react';
import { onSnapshot, collection, getDocs } from 'firebase/firestore';
import { getSession, useSession } from 'next-auth/react';
import moment from 'moment';
import db from '../utils/db';
import Header from '../components/Header';
import { Order } from '../components';

export default function Orders({ orders }) {
  console.log(orders);
  return (
    <div>
      <Head>
        <title>Amazon</title>
        <meta name="description" content="Created for learning purpose" />
        <link rel="icon" href="/amazon-icon.png" />
      </Head>
      <Header />
      <main className="bg-white max-w-screen-2xl mx-auto p-10">
        <h2 className="md:text-3xl text-2xl border-b pb-2 border-yellow-400">
          Your Orders
        </h2>
        <div className="mt-6">
          {orders.map((order) => (
            <Order key={order.id} {...order} />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  if (!session) {
    return {
      props: {},
    };
  }
  const snapShot = await db
    .collection('customers')
    .doc(session.user.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get();

  const orders = await Promise.all(
    snapShot.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: { orders },
  };
}
