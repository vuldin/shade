import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { getProfile } from "3box/lib/api";

function App() {
  const [hasWeb3, setHasWeb3] = useState(false);
  const [accounts, setAccounts] = useState([]);
  // const [box, setBox] = useState({});
  // const [space, setSpace] = useState({});
  const [profile, setProfile] = useState({});

  const isMetaMaskInstalled = () => Boolean(window.ethereum?.isMetaMask);

  async function getAccounts() {
    if (isMetaMaskInstalled()) {
      setHasWeb3(true);
      ethereum.autoRefreshOnNetworkChange = false;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setAccounts(accounts);
    }
  }

  async function getProfileData() {
    /*
    const box = await Box.openBox(accounts[0], window.ethereum);
    const space = box.openSpace("shade");
    setBox(box);
    setSpace(space);
    */

    /*
{
 "image": [
  {
   "@type": "ImageObject",
   "contentUrl": {
    "/": "QmRX5ic5aC3PywDW25zXii6rd2Rsba7FzzKaNLNUrQ28cN"
   }
  }
 ],
 "emoji": "🤯",
 "name": "Vuldin",
 "proof_github": "https://gist.githubusercontent.com/vuldin/79a606536a3f78b335088fc271bfab19/raw/9912552a74457426064fe182e015095818c7f454/gistfile1.txt",
 "memberSince": "Mon Feb 24 2020 22:46:18 GMT-0500 (Eastern Standard Time)",
 "proof_did": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE1ODI2MDIzODIsImlzcyI6ImRpZDozOmJhZnlyZWlkdmZ2bG12YXZnN3hwN3pram5sYXpnNTZ6ams0a3kyZXZsaWx5N2c2azRyMmRyem9vN3V1In0.qnmGK2IWiGIEFVKaiICYKcTY95yobJCIBIYJQTiU90WtFwwWqeVadkgZsZIFJFAguTJ6gQcl-QSJe4rahqy-mg"
}
    */
    const profile = await getProfile(accounts[0]);
    setProfile(profile);
  }

  useEffect(() => {
    getAccounts();
    // !hasWeb3 && getAddressFromMetaMask();
  }, [hasWeb3]);

  useEffect(() => {
    if (accounts.length > 0) {
      // Now we have enabled the provider and have the users
      // ethereum address we can start working with 3Box
      getProfileData();
    }
  }, [accounts]);

  ethereum.on("accountsChanged", (accountId) => {
    setAccounts(accountId);
  });

  let jsx = <h1>install metamask</h1>;

  jsx =
    accounts.length === 0 ? (
      <h1>waiting for account data...</h1>
    ) : (
      <>
        <h1>{accounts[0]}</h1>
        <div>
          <span>{profile.name}</span>
          <span>{profile.emoji}</span>
        </div>
        <div>Member since: {profile.memberSince}</div>
      </>
    );

  return jsx;
}

render(<App />, document.getElementById("app"));
