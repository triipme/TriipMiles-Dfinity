import React from "react";

const GeoLocationEmbed = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          '<iframe src="https://futureeyes.github.io/arlocation/getalllocateScale.html" frameborder="0" style="width: 100vw; height:99vh" allowFullScreen allow="camera;geolocation;"></iframe>'
      }}
    />
  );
};

export default GeoLocationEmbed;
