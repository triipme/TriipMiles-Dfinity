import React, { Suspense, useEffect, useState } from "react";
import AFrameRenderer from "./AFrameRenderer.ar";
import Marker from "./Marker.ar";
import { useGeolocation } from "react-use";
// import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
// import { useLoader, Canvas } from "@react-three/fiber";
// import { Entity, Scene } from "aframe-react";

// import { Environment, OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { sRGBEncoding } from "three";
// const Model = () => {
//   const gltf = useLoader(GLTFLoader, "data/Bee.glb");
//   return (
//     <>
//       <primitive object={gltf.scene} scale={0.4} />
//     </>
//   );
// };
const Geolocation = () => {
  const [position, setPosition] = useState({ lat: 0, long: 0 });
  const l = useGeolocation();
  console.log(JSON.stringify(l, 2, null));
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        setPosition({ lat: p.coords.latitude, long: p.coords.longitude });
        alert(`latitude: ${p.coords.latitude}; longitude: ${p.coords.longitude}`);
      });
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  });
  console.log("position", position);
  return (
    <div style={{ position: "relative" }}>
      {/* Geolocation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: "#fff"
        }}>{`latitude: ${position.lat}; longitude: ${position.long}`}</div>
      <AFrameRenderer inherent={true}>
        <a-text
          value="This content will always face you."
          look-at="[gps-camera]"
          scale="120 120 120"
          gps-entity-place={`latitude: ${position.lat}; longitude: ${position.long};`}></a-text>
        <a-camera gps-camera rotation-reader></a-camera>
      </AFrameRenderer>
    </div>
  );
};
export default Geolocation;
