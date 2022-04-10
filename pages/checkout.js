import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { CartItems, Footer, Header } from '../components';
import { selectTotal } from '../slices/cartSlice';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const { data: session } = useSession();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector(selectTotal);
  console.log(cartItems);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    // create a checkout session from backend

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items: cartItems,
      email: session.user.email,
    });

    // redirect user to checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Checkout - Amazon</title>
        <meta name="description" content="Created for learning purpose" />
        <link rel="icon" href="/amazon-icon.png" />
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto lg:flex lg:space-x-6">
        {/* left side  */}
        <div className="flex-1 shadow-sm p-4">
          <Image
            src="/images/ikj.webp"
            width="1300"
            height="300"
            objectFit="contain"
          />
          <div className="bg-white p-4">
            <h2 className="text-3xl mb-8">
              {cartItems.length
                ? 'Shopping Basket'
                : `You don't have anything on the cart`}
            </h2>
            {cartItems.map((product) => (
              <CartItems key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* right side  */}
        <div className="bg-white shadow-md p-10 flex flex-col">
          <p className="px-2">
            Subtotal ({cartItems.length} items) :{' '}
            <span className="font-bold">
              {total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
          {/* checkout button  */}
          {!!cartItems.length && (
            <button
              type="button"
              className={`button mt-4 ${
                !session &&
                'cursor-not-allowed from-gray-200 to-gray-400 border border-gray-50'
              }`}
              disabled={!session}
              onClick={createCheckoutSession}
            >
              {session ? `Checkout` : `Sign in to checkout`}
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
