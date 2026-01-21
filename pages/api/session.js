import { getToken } from "@gr4vy/sdk";
import fs from "fs";
import { server, id } from "../../config.json";

// This creates a new Plaid Link token for use in the frontend.
// As this API returns an unstructured response, we're unable to add this to 
// our typed SDK. We use the SDK's `getToken` method to make an API call using standard fetch.
 
export default async (_, response) => {
    const baseUrl = `https://api.${server === 'sandbox' ? 'sandbox.' : ''}${id}.gr4vy.app`

    const result = await fetch(`${baseUrl}/payment-service-definitions/plaid-bank/sessions`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${await getToken({
          privateKey: fs.readFileSync("private_key.pem", "utf8"),
        })}`,
      },
      body: JSON.stringify({
         "action": "create-link-token",
         "payload": {
            products: ["auth"],
            optional_products: []
         }
      })
    }).then((res) => res.json());

    response.status(200).json(result["response_body"])
}
