import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./triip_icp.did.js";
export { idlFactory } from "./triip_icp.did.js";
// CANISTER_ID is replaced by webpack based on node environment
export const canisterIdTransfer = process.env.TRIIP_ICP_CANISTER_ID;

/**
 *
 * @param {string | import("@dfinity/principal").Principal} canisterIdTransfer Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./triip_icp.did.js")._SERVICE>}
 */
export const createActorTransfer = (canisterIdTransfer, options) => {
  const agent = new HttpAgent({ ...options?.agentOptions });

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterIdTransfer,
    ...options?.actorOptions
  });
};

/**
 * A ready-to-use agent for the triip_icp canister
 * @type {import("@dfinity/agent").ActorSubclass<import("./triip_icp.did.js")._SERVICE>}
 */
export const triip_icp = createActorTransfer(canisterIdTransfer);
