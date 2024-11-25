import Stripe from 'stripe';
import * as Yup from 'yup'
//import 'dotenv/config';
//import .env
const stripe = Stripe('sk_test_51QF1UPRrOxaqQzNyUXSi7d7kWOP7nhia5kVwfZfdFy20dE1IIBMNLLIudEPW6fQsTQH1iBsugWU7DdR36VuGLuIA00MeJSCH8w')
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) =>{
        return acc + current.price * current.quantity;
    },0);
    return total;
};

class CreatePaymentIntentController {
    async store(request, response){
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                    price: Yup.number().required(),
                }),
            ),
        });

        try {
            schema.validateSync(request.body, {abortEarly: false})
        } catch(err) {
            return response.status(400).json({error: err.errors})
        } 

        const {products} = request.body;
        const amount = calculateOrderAmount(products);

         // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "brl",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  response.json({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });

    }
}

export default new CreatePaymentIntentController();