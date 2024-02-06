import React from "react";
import Assets from "../../../assets";
import Constants from "../../../constants";
import BackgroundMusic from "../BackgroundMusic";
import "./Loading.css"
export default React.memo(()=>{
  const containerRef = React.useRef();
  return <div className="loading card" ref={containerRef}>
  <div className="card-title">@{Constants.USER} &gt; loading</div>
  <div className="loading-wrapper">
      <img
        id="loading-image"
        src={Assets.loader}
        alt=""
      />
      <div id="loading-header">
        LOADING...
      </div>
      < BackgroundMusic loading={true} containerRef={containerRef}/>
  </div>
</div>
});
