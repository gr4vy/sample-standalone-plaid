import Head from "next/head";
import { useEffect, useState } from "react";
import { PlaidLink } from "react-plaid-link";

const Home = () => {
  const [session, setSession] = useState(null);
  const [linkData, setLinkData] = useState(null);
  const [transaction, setTransaction] = useState(null);

  // Fetch the plaid Link token
  useEffect(() => {
    if (!session) {
      fetch(`/api/session`)
        .then((res) => res.json())
        .then(setSession);
    }
  }, [session]);

  // Once Plaid Link has successfully authenticated the user, create
  // a transaction
  useEffect(() => {
    if (linkData) {
      fetch(`/api/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(linkData),
      })
        .then((res) => res.json())
        .then(setTransaction);
    }
  }, [linkData]);

  return (
    <>
      <Head>
        <title>Sample</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
      </Head>
      <main>
        {session && (
          <>
            <PlaidLink token={session["link_token"]} onSuccess={(token, metadata) => {
              setLinkData({token, metadata});
            }}>
              Link your bank account
            </PlaidLink>
            <pre><code>{linkData && JSON.stringify(linkData, null, 2)}</code></pre>
            <pre><code>{transaction && JSON.stringify(transaction, null, 2)}</code></pre>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
