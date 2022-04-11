import React from "react";
import { useState } from "react";

import { Icon } from "@iconify/react";

// Metaverse Tab UI
const Metaverse = () => {
  return (
    <>
      <div className="servicesDetail">
        <div className="servicesDetailInfo">
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Free to Win and Play to Earn </span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>One token for both travelers and gamers</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>100% built on Web 3.0</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>AR ready</span>
          </div>
        </div>
        <div className="servicesDetailImg">
          <img
            src="https://ik.imagekit.io/1cfogorcfir/Triip/tab-1_MM_eXtYUH.png?updatedAt=1639628912801"
            alt="services"
          />
        </div>
      </div>
      <div className="getStartedFooter">
        <a className="iconLink" target="_blank" href="https://twitter.com/triipme" rel="noreferrer">
          <button className="btn btnFollow btnStarted">
            <Icon icon="iconoir:twitter" className="iconTwitter" />
            Follow Us Now
          </button>
        </a>
      </div>
    </>
  );
};
// HotelBooking Tab UI
const HotelBooking = () => {
  return (
    <>
      <div className="servicesDetail">
        <div className="servicesDetailInfo">
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>
              More than 28 million reported accommodation listings, including over 6.2 million
              homes, apartments, and other unique places to stay.
            </span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Better than the best price</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Large inventory from Booking.com and Agoda</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Easily booking with TriipMiles</span>
          </div>
        </div>
        <div className="servicesDetailImg">
          <img
            src="https://ik.imagekit.io/1cfogorcfir/Triip/tab-1_MM_eXtYUH.png?updatedAt=1639628912801"
            alt="services"
          />
        </div>
      </div>
      <div className="getStartedFooter">
        <button className="btn btnSignUp ">Sign Up Now</button>
      </div>
    </>
  );
};
// Travel Tab UI
const Travel = () => {
  return (
    <>
      <div className="servicesDetail">
        <div className="servicesDetailInfo">
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>100,000+ activies in 100+ countries</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Best price guranateed</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Quick payment, instant ticket receipt</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Easily booking with TIIM</span>
          </div>
        </div>
        <div className="servicesDetailImg">
          <img
            src="https://ik.imagekit.io/1cfogorcfir/Triip/tab-2_If4j1VTIN.png?updatedAt=1639628913233"
            alt="services"
          />
        </div>
      </div>
      <div className="getStartedFooter">
        <a
          className="iconLink"
          target="_blank"
          href="https://experience.triip.me/"
          rel="noreferrer">
          <button className="btn btnSignUp ">Book Now</button>
        </a>
      </div>
    </>
  );
};

// OnlineShopping Tab UI
const OnlineShopping = () => {
  return (
    <>
      <div className="servicesDetail">
        <div className="servicesDetailInfo">
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Personalized design, affordable prices</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Global shipping</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>High quality materials</span>
          </div>
          <div className="servicesDetailInfoContainer">
            <img src="./images/static/SUSTAINATIONS/check.png" alt="checked" />
            <span>Easily booking with TIIM</span>
          </div>
        </div>
        <div className="servicesDetailImg">
          <img
            src="https://ik.imagekit.io/1cfogorcfir/Triip/tab-3_KlTU-WlEY.png?updatedAt=1639628912826"
            alt="services"
          />
        </div>
      </div>
      <div className="getStartedFooter">
        <a className="iconLink" target="_blank" href="https://shopping.triip.me/" rel="noreferrer">
          <button className="btn btnSignUp ">Shopping Now</button>
        </a>
      </div>
    </>
  );
};

const tabs = ["Metaverse", "HotelBooking", "Travel", "OnlineShopping"];

function Services() {
  const [type, setType] = useState("Metaverse");
  const [active, setActive] = useState("Metaverse");
  const changeTab = tab => {
    setActive(tab);
    setType(tab);
  };
  return (
    <>
      {/* Utilities & Services */}
      <div className="services">
        <p className="servicesHeading">Utilities & Services</p>
        <div className="servicesContainer">
          <ul className="servicesList">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={type === tab ? "active" : ""}
                onClick={() => changeTab(tab)}>
                {tab}
              </li>
            ))}
          </ul>
          {active === "Metaverse" && <Metaverse />}
          {active === "HotelBooking" && <HotelBooking />}
          {active === "Travel" && <Travel />}
          {active === "OnlineShopping" && <OnlineShopping />}
        </div>
      </div>
    </>
  );
}

export default Services;
