import React, { useState, useEffect, useRef } from "react";

import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

const Home = () => {
  const authClient = useRef(null);
  const [principalEl, setPrincipalEl] = useState("");
  const [idpUrlEl, setIdpUrlEl] = useState("https://identity.messaging.ic0.app/#authorize");
  const [canisterIdEl, setCanisterIdEl] = useState("4k2wq-cqaaa-aaaab-qac7q-cai");
  const [hostUrlEl, setHostUrlEl] = useState("https://gw.dfinity.network");
  const [whoamiEl, setWhoamiEl] = useState("");

  useEffect(() => {
    // init
    (async () => {
      authClient.current = await AuthClient.create();
      setPrincipalEl(await authClient.current.getIdentity().getPrincipal());
    })();
  }, []);

  // Redirect to the identity provider
  const handleSignIn = async () => {
    authClient.current.login({
      indentityProvider: idpUrlEl,
      onSuccess: async () => {
        setPrincipalEl(await authClient.current.getIdentity().getPrincipal());
      }
    });
  };
  const handleSignOut = async () => {
    authClient.current.logout();
    setPrincipalEl(await authClient.current.getIdentity().getPrincipal());
  };
  const handleWhoami = async () => {
    const indentity = await authClient.current.getIdentity();

    const idFactory = ({ IDL }) => IDL.Service({ whoami: IDL.Func([], [IDL.Principal], []) });
    const canisterId = Principal.fromText(canisterIdEl);
    const actor = Actor.createActor(idFactory, {
      agent: new HttpAgent({
        host: hostUrlEl,
        indentity
      }),
      canisterId
    });
    setWhoamiEl("Loading...");
    actor.whoami().then(principal => {
      console.log(principal);
      setWhoamiEl(principal.toText());
    });
  };
  return (
    <div>
      <div>
        <div>
          <label for="idpUrl" style={{ display: "inline-block", width: 120 }}>
            Identity Provider:
          </label>
          <input type="text" id="idpUrl" value={idpUrlEl} onChange={event => setIdpUrlEl(event.target.value)} />
        </div>
        <button onClick={handleSignIn} id="signinBtn">
          Sign In
        </button>
        <button onClick={handleSignOut} id="signoutBtn">
          Sign Out
        </button>
        <h2>Principal:</h2>
        <div id="principal">{(principalEl + "").length < 60 ? "No sign in" : principalEl + ""}</div>
      </div>

      <div>
        <h1>Contact the IC</h1>
        <label for="hostUrl" style={{ display: "inline-block", width: 120 }}>
          Replica URL:
        </label>
        <input type="text" id="hostUrl" value={hostUrlEl} onChange={event => setHostUrlEl(event.target.value)} />
        <br />
        <label for="canisterId" style={{ display: "inline-block", width: 120 }}>
          Canister ID:
        </label>
        <input type="text" id="canisterId" value={canisterIdEl} onChange={event => setCanisterIdEl(event.target.value)} />
      </div>
      <div>
        <button onClick={handleWhoami} id="whoamiBtn">
          Who Am I?
        </button>
        <div id="whoamiResponse">{whoamiEl}</div>
      </div>
    </div>
  );
};

export default Home;
