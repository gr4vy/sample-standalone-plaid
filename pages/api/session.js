import { Gr4vy, withToken } from "@gr4vy/sdk";
import fs from "fs";
import { server, id } from "../../config.json";

// This creates a new Plaid Link token for use in the frontend.
// As this API returns an unstructured response, we're unable to add this to
// our typed SDK. We use the SDK's `getToken` method to make an API call using standard fetch.

export default async (_, response) => {
  const gr4vy = new Gr4vy({
    id,
    server,
    bearerAuth: withToken({
      privateKey: fs.readFileSync("private_key.pem", "utf8"),
    }),
  });

  const result = await gr4vy.paymentServiceDefinitions.session(
    {
      action: "create-link-token",
      // payload: {
      //   products: ["auth"],
      //   optional_products: [],
      // },
    },
    "plaid-bank",
  );

  response.status(200).json(result.responseBody);
};
