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
          <p className="sustainationsHeading">
            <b>Why Sustainations</b>
          </p>
          <div className="sustainationsReasonItem">
            <img src="./images/static/SUSTAINATIONS/triip_gold.png" alt="triipGold" />
            <p>
              We commits a <b>sizeable portion of game profit</b> to <b>plant trees and corals</b>{" "}
              in the real world
            </p>
          </div>
        </div>
        <div className="sustainationsBody">
          <div className="sustainationBodyLeft">
            <div className="sustainationsReasonItem">
              <div className="sustainationsReasonItemImg">
                <img src="./images/static/SUSTAINATIONS/triip_gold.png" alt="triipGold" />
              </div>
              <p>
                {" "}
                <b> One token </b> for both offline travel and metaverse economy
              </p>
            </div>
            <div className="sustainationsReasonItem">
              <img src="./images/static/SUSTAINATIONS/triip_gold.png" alt="triipGold" />
              <p>
                Leverage Triip’s vastness of <b>29 million rooms</b> and <b>100,000 experiences</b>
                in <b>192 countries</b> in the physical world
              </p>
            </div>
          </div>
          <div className="sustainationBodyImg">
            <img src="./images/static/SUSTAINATIONS/SNS_game_map-06.png" alt="bitmap" />
          </div>
          <div className="sustainationBodyRight">
            <div className="sustainationsReasonItem">
              <img src="./images/static/SUSTAINATIONS/triip_gold.png" alt="triipGold" />
              <p>
                Built entirely on the <b>#1 web3.0 infrastructure</b> - The Internet Computer
              </p>
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
