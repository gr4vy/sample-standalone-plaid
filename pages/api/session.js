import { getToken } from "@gr4vy/sdk";
import fs from "fs";
import { server, id } from "../../config.json";

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
         "action": "create-link-token"
      })
    }).then((res) => res.json());

    response.status(200).json(result["response_body"])
}
