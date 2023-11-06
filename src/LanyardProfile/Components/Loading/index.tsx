import React from "react";
import Assets from "../../../assets";
import Constants from "../../../constants";
import "./Loading.css"
export default React.memo(()=>{
  return <div className={`loading card`}>
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
  </div>
</div>
});
