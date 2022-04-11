import React from "react";

function SustainationsReason() {
  return (
    <>
      {/* Why Sustainations */}
      <div className="sustainationsReason Mobile">
        <img
          src="./images/static/SUSTAINATIONS/Sustaination_truck.png"
          alt="sustainationTruck"
          className="sustainationTruck"
        />
        <div className="sustainationsHeader">
          <p className="sustainationsHeading">Why Sustainations</p>
          <div className="sustainationsReasonItem">
            <img src="./images/static/SUSTAINATIONS/triip_gold.png" alt="triipGold" />
            <p>
              We commits a sizeable portion of game profit to plant trees and corals in the real
              world
            </p>
          </div>
        </div>
        <div className="sustainationsBody">
          <div className="sustainationBodyLeft">
            <div className="sustainationsReasonItem">
              <div className="sustainationsReasonItemImg">
                <img src="./images/static/SUSTAINATIONS/triip_gold.png" alt="triipGold" />
              </div>
              <p>One token for both offline travel and metaverse economy</p>
            </div>
            <div className="sustainationsReasonItem">
              <img src="./images/static/SUSTAINATIONS/triip_gold.png" alt="triipGold" />
              <p>
                Leverage Triip’s vastness of 29 million rooms and 100,000 experiences in 192
                countries in the physical world
              </p>
            </div>
          </div>
          <div className="sustainationBodyImg">
            <img src="./images/static/SUSTAINATIONS/SNS_game_map-06.png" alt="bitmap" />
          </div>
          <div className="sustainationBodyRight">
            <div className="sustainationsReasonItem">
              <img src="./images/static/SUSTAINATIONS/triip_gold.png" alt="triipGold" />
              <p>Built entirely on the #1 web3.0 infrastructure - The Internet Computer</p>
            </div>
            <div className="sustainationsReasonItem">
              <img src="./images/static/SUSTAINATIONS/triip_gold.png" alt="triipGold" />
              <p>Backed by one of the world’s top travel destinations - Catalonia</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SustainationsReason;
