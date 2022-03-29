import React, { useState, useEffect } from "react";

const homepageImgage = {
  mobile: "https://firebasestorage.googleapis.com/v0/b/triip-me.appspot.com/o/triip-protocol%2Fmetaverse%2FMetaverseMobileHomepage.png?alt=media&token=53cb82d6-90b4-445e-9a0f-b4ef4f56eb0b",
  webapp: "https://firebasestorage.googleapis.com/v0/b/triip-me.appspot.com/o/triip-protocol%2Fmetaverse%2FMetaverseHomepage.png?alt=media&token=4c27ae9c-deb6-418d-ac05-144f6f20e37f"
}

function Metaverse() {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width < 600;

  console.log('duma', isMobile);
  if (isMobile) {
    return (
      <div><img style={{ width: "100%" }} src={homepageImgage.mobile} /></div>
    )
  }
  return (
    <div><img style={{ width: "100%" }} src={homepageImgage.webapp} /></div>
  );
};

export default Metaverse;
