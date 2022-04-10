import { buffer } from 'micro';
import admin from 'firebase-admin';
// establishing connection to stripe
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// connecting to Firestore DB
const serviceAccount = require('../../firebase-service-account-config.json');

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// fullfilling order
const fullfillOrder = (session) => {
  console.log('completing order', session);

  return app
    .firestore()
    .collection('customers')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];
    console.log('webhook is firing');

    let event;

    // verify that the event posted came from stirpe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
    } catch (err) {
      console.log('error', err.message);
      return res.status(400).send(`Webhook error:${err.message}`);
    }

    // handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
