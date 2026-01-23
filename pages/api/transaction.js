import { Gr4vy, withToken } from "@gr4vy/sdk";
import fs from "fs";
import { server, id, paymentServiceId } from "../../config.json";

// This creates a new transaction using the Plaid public token

export default async (request, response) => {
  const { token, metadata } = request.body;

  const gr4vy = new Gr4vy({
    id,
    server,
    bearerAuth: withToken({
      privateKey: fs.readFileSync("private_key.pem", "utf8"),
    }),
  });

  const result = await gr4vy.transactions.create({
    amount: 1299,
    currency: "USD",
    country: "US",
    intent: "capture",
    paymentMethod: {
      method: "plaid",
      // Passing the account ID is optional
      // accountId: metadata["accounts"][0]["id"],
      token,
    },
    // Passing the buyer is only required when Plaid Identity has been disabled
    // buyer: {
    //   billingDetails: {
    //     firstName: "John",
    //     lastName: "Doe",
    //   },
    // },
    paymentServiceId,
  });

  response.status(200).json(result);
};
