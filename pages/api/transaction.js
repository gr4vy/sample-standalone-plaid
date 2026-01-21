import { Gr4vy, withToken } from "@gr4vy/sdk";
import fs from "fs";
import {server, id, paymentServiceId } from "../../config.json";

export default async (request, response) => {
  const { token } = request.body

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
      token,
    },
    paymentServiceId,
  });

  response.status(200).json(result);
};
