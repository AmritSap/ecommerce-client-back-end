import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const idempotency_key = uuidv4();

import { getUserByEmail } from "../models/newUser/NewUser.model.js";
import { comparePassword } from "../helpers/passwordBycrypt.helpers.js";
import { createAccessJWT, createRefreshJWT } from "../jwthelpers/jwthelpers.js";
import { loginValidation } from "../middlewares/formValidation.midleware.js";

router.post("/", async (req, res) => {
  const { token, product } = req.body;
  return stripe.customer
    .create({ email: token.email, source: token.id })
    .then(
      (customer) => {
        stripe.charges.create({
          customer: customer.id,
          amount: product.total,
          currency: "AUD",
          description: "New order payment",
          receipt_email: token.email,
        });
      },
      { idempotency_key }
    )
    .then((result) => {
      console.log(result);
      res.send({
        status: "Success",
        message: "payment taken",
        result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.send({
        status: "error",
        message: "Error!! Unable to take the payment",
      });
    });

  // res.send({
  //   status: "success",
  //   message: "paymemnt processed",
  // });
  // console.log("paymemnt router");
});

export default router;
