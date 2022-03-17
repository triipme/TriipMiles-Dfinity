import React, { Suspense, useEffect, useState } from "react";
import { AFrameRenderer } from "react-web-ar";
import { Entity, Camera, Light, Scene } from "react-aframe-ar";
const Geolocation = () => {
  const [position, setPosition] = useState({ lat: 0, long: 0 });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        setPosition({ lat: p.coords.latitude, long: p.coords.longitude });
        alert(`latitude: ${p.coords.latitude}; longitude: ${p.coords.longitude}`);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <a-scene
              renderer="logarithmicDepthBuffer: true;"
              loading-screen="enabled: false;"
              arjs="sourceType: webcam; debugUIEnabled: false;"
              raycaster="objects: [gps-projected-entity-place];"
              vr-mode-ui="enabled: false">
              <a-assets>
                <a-asset-item
                    id="animated-asset"
                    src="https://raw.githubusercontent.com/FutureEyes/FutureEyes.github.io/main/arlocation/assets/asset.gltf"
                ></a-asset-item>
                <img id="reflection" src="https://raw.githubusercontent.com/mrdoob/three.js/r82/examples/textures/2294472375_24a3b8ef46_o.jpg"/>
                <img id="sky" src="https://raw.githubusercontent.com/mrdoob/three.js/r82/examples/textures/2294472375_24a3b8ef46_o.jpg"/>
              </a-assets>
              <a-entity id="'ambientlight"  light="type: ambient; intensity: 0.4;"></a-entity>          
              <a-light type="directional" position="0 0 0" rotation="0 0 0" target="#directionaltarget">
              <a-entity id="directionaltarget" position="0 0 -1">
                <a-entity
                look-at="[gps-camera]"
                animation-mixer="loop: repeat"
                gltf-model="#animated-asset"
                light="type: ambient; intensity: 0.4;"
                scale="0.5 0.5 0.5"
                gps-entity-place="latitude:${position.lat}; longitude:${position.long};"
                ></a-entity>
              </a-entity>
              <a-camera gps-camera rotation-reader></a-camera>
            </a-scene>
          `
        }}
      />
    </div>
  );
};
export default Geolocation;

{
  /* <AFrameRenderer
        // stats
        device-orientation-permission-ui="enabled: true"
        inherent={false}
        renderer="logarithmicDepthBuffer: true;"
        cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;"
        raycaster="objects: [gps-projected-entity-place];">
        <a-assets>
          <a-asset-item
            id="animated-asset"
            src="https://raw.githubusercontent.com/FutureEyes/FutureEyes.github.io/main/arlocation/assets/asset.gltf"></a-asset-item>
          <img
            crossOrigin="anonymous"
            id="reflection"
            src="https://raw.githubusercontent.com/mrdoob/three.js/r82/examples/textures/2294472375_24a3b8ef46_o.jpg"
          />
          <img
            crossOrigin="anonymous"
            id="sky"
            src="https://raw.githubusercontent.com/mrdoob/three.js/r82/examples/textures/2294472375_24a3b8ef46_o.jpg"
          />
        </a-assets>
        <Entity id="'ambientlight" light="type: ambient; intensity: 0.4;"></Entity>
        <Entity id="directionaltarget" position="0 0 -1">
         <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place="latitude:16.0654601; longitude:108.1966363;"></Entity>
          <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place="latitude:10.80145366733753; longitude:106.70475971303551;"></Entity>
          <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place="latitude:10.755488; longitude:106.709189;"></Entity>
          <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place="latitude:16.067469; longitude:108.197031;"></Entity>
          <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place="latitude:39.89610; longitude:32.81643;"></Entity>
          <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place="latitude:10.70098968174121; longitude:106.7300813642215;"></Entity>
          <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place="latitude:41.09667; longitude:28.88152;"></Entity>
          <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place="latitude:15.6621488; longitude:108.1795175;"></Entity>
          <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place="latitude:16.05173191737857; longitude:108.21429606322283;"></Entity>
          <Entity
            look-at="[gps-projected-entity-place]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            position="0 1 -4"
            light="type: ambient; intensity: 0.4;"
            scale="1.2184615980777895 1.2184615980777895 1.2184615980777895"
            gps-projected-entity-place={`latitude:${position.lat}; longitude:${position.long};`}></Entity>
        </Entity>
        <Light
          type="directional"
          position="0 0 0"
          rotation="0 0 0"
          target="#directionaltarget"></Light>
        <Entity camera look-controls gps-projected-camera rotation-reader></Entity>
      </AFrameRenderer> */
}
