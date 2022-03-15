import React, { Suspense, useEffect, useState } from "react";
import { AFrameRenderer, Marker } from "react-web-ar";
import { useGeolocation } from "react-use";
import { Entity } from "react-aframe-ar";
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
  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <AFrameRenderer
        renderer="logarithmicDepthBuffer: true"
        embedded
        loading-screen="enabled: false;"
        arToolKit={{ sourceType: "webcam", debugUIEnabled: false }}
        vr-mode-ui="enabled: false">
        <a-assets>
          <a-asset-item
            id="animated-asset"
            src="https://raw.githubusercontent.com/FutureEyes/FutureEyes.github.io/main/arlocation/assets/asset.gltf"></a-asset-item>
          <img
            id="reflection"
            src="https://raw.githubusercontent.com/mrdoob/three.js/r82/examples/textures/2294472375_24a3b8ef46_o.jpg"
          />
          <img
            id="sky"
            src="https://raw.githubusercontent.com/mrdoob/three.js/r82/examples/textures/2294472375_24a3b8ef46_o.jpg"
          />
        </a-assets>
        <a-entity id="'ambientlight" light="type: ambient; intensity: 0.4;"></a-entity>
        <a-light
          type="directional"
          position="0 0 0"
          rotation="0 0 0"
          target="#directionaltarget"></a-light>
        <a-entity id="directionaltarget" position="0 0 -1"></a-entity>
        <Entity
          look-at="[gps-camera]"
          animation-mixer="loop: repeat"
          gltf-model="#animated-asset"
          light="type: ambient; intensity: 0.4;"
          // light="type: directional;
          //                            castShadow: true;
          //                            intensity: 0.35;
          //                            shadowCameraVisible: true;"
          scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
          gps-entity-place="latitude:10.80145366733753; longitude:106.70475971303551;"></Entity>

        {/* <!--Duy house--> */}
        <Entity
          look-at="[gps-camera]"
          animation-mixer="loop: repeat"
          gltf-model="#animated-asset"
          light="type: ambient; intensity: 0.4;"
          // light="type: directional;
          //                        castShadow: true;
          //                        intensity: 0.35;
          //                        shadowCameraVisible: true;"
          scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
          gps-entity-place="latitude:10.755488; longitude:106.709189;"></Entity>
        {/* <!--- Quan house --> */}
        <Entity
          look-at="[gps-camera]"
          animation-mixer="loop: repeat"
          gltf-model="#animated-asset"
          light="type: ambient; intensity: 0.4;"
          // light="type: directional;
          //                        castShadow: true;
          //                        intensity: 0.35;
          //                        shadowCameraVisible: true;"
          reflection="directionalLight:a-light#dirlight;"
          scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
          gps-entity-place="latitude:16.067469; longitude:108.197031;"></Entity>
        {/* <!--Turkey --> */}
        <Entity
          look-at="[gps-camera]"
          animation-mixer="loop: repeat"
          gltf-model="#animated-asset"
          light="type: ambient; intensity: 0.4;"
          // light="type: directional;
          //                       castShadow: true;
          //                       intensity: 0.35;
          //                       shadowCameraVisible: true;"
          scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
          gps-entity-place="latitude:39.89610; longitude:32.81643;"></Entity>
        {/* <!--- Phong house --> */}
        <Entity
          look-at="[gps-camera]"
          animation-mixer="loop: repeat"
          gltf-model="#animated-asset"
          reflection="directionalLight:a-light#dirlight;"
          light="type: ambient; intensity: 0.4;"
          // light="type: directional;
          //                 castShadow: true;
          //                 intensity: 0.35;
          //                 shadowCameraVisible: true;"
          scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
          gps-entity-place="latitude:10.70098968174121; longitude:106.7300813642215;"></Entity>
        {/* <!--new input --> */}
        <Entity
          look-at="[gps-camera]"
          animation-mixer="loop: repeat"
          gltf-model="#animated-asset"
          light="type: ambient; intensity: 0.4;"
          // light="type: directional;
          //                       castShadow: true;
          //                       intensity: 0.35;
          //                       shadowCameraVisible: true;"
          scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
          gps-entity-place="latitude:41.09667; longitude:28.88152;"></Entity>
        <a-camera gps-camera rotation-reader></a-camera>
      </AFrameRenderer>
    </div>
  );
};
export default Geolocation;
