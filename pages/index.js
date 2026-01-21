import Head from "next/head";
import { useEffect, useState } from "react";
import { PlaidLink } from "react-plaid-link";

const Home = () => {
  const [session, setSession] = useState(null);
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    if (!session) {
      fetch(`/api/session`).then((res) => res.json()).then(setSession);
    }
  }, [session]);


  useEffect(() => {
    if (linkToken) {
      fetch(`/api/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: linkToken
        })
      }).then((res) => res.json()).then(console.log);
    }
  }, [linkToken]);


  return (
    <>
      <Head>
        <title>Sample</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
      </Head>
      <main>
        {session && (
          <PlaidLink
            token={session['link_token']}
            onSuccess={setLinkToken}
          >
            Link your bank account
          </PlaidLink>
        )}
      </main>
    </>
  );
};

export default Home;
