import React from "react";
import "./Component/style/Sustaination.css";

import Header from "./Component/Header";
import Trailer from "./Component/Trailer";
import BackedBy from "./Component/BackedBy";
import Minigame from "./Component/Minigame";
import SustainationsReason from "./Component/SustainationsReason";
import SliderComp from "./Component/Slider";
import Services from "./Component/Services";
import GetStartedComp from "./Component/getStartedComp";
import { Footer } from "../../containers";
function Metaverse() {
  return (
    <>
      <Header />
      <Trailer />
      <BackedBy />
      <Minigame />
      <SustainationsReason />
      <SliderComp />
      <GetStartedComp />
      <Services />
      <Footer />
    </>
  );
}
export default Metaverse;
