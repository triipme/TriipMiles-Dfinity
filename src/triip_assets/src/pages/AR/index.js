import React, { Suspense } from "react";
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import { useLoader, Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { sRGBEncoding } from "three";
const Model = () => {
  const gltf = useLoader(GLTFLoader, "data/Bee.glb");
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  );
};
const AR = () => {
  return (
    <ARCanvas
      gl={{ antialias: false, powerPreference: "default" }}
      dpr={window.devicePixelRatio}
      onCameraStreamReady={() => console.log("Camera stream ready")}
      onCameraStreamError={() => console.error("Camera stream error")}
      onCreated={({ gl }) => {
        gl.outputEncoding = sRGBEncoding;
        gl.physicallyCorrectLights = true;
        gl.setSize(window.innerWidth, window.innerHeight);
      }}>
      <ARMarker
        type={"pattern"}
        patternUrl={"data/marker.patt"}
        onMarkerFound={() => {
          console.log("Marker Found");
        }}
        onMarkerLost={() => console.log("marker lost")}>
        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
          {/* <Environment preset="sunset" background /> */}
        </Suspense>
      </ARMarker>
    </ARCanvas>
  );
};
export default AR;
