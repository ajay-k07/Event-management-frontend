import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51Ht4kbEbuNVtPuVmgl6YUOezAD4wu4RLc6FW2deHCZ0zcFtWu7DcmX3FOT9mKjXXWDrO039xXslJNgN7EooO0xMy00BI8p7KU0";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = (props) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm event={props.event} register={props.register}/>
    </Elements>
  );
};

export default Stripe;