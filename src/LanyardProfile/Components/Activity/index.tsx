import React from "react";
import Constants from "../../../constants";
import { ProfileData } from "../../Types";
import "./Activity.css";
export default React.memo(({ activity }: ProfileData) => {
  return (
    <div className={`activity card ${activity.hidden ? "hidden" : ""}`}>
      <div className="card-title">@{Constants.USER} &gt; activity</div>
      <div className="activity-wrapper">
        <div className="activity-images">
          <img
            id="activity-big-image"
            className={`${!activity.bigImage ? "hidden" : ""}`}
            src={activity.bigImage}
            alt=""
          />
          <img
            id="activity-small-image"
            className={`${!activity.smallImage ? "hidden" : ""}`}
            src={activity.smallImage}
            alt=""
          />
        </div>
        <div className="activity-info">
          <div id="activity-name" className={`${!activity.name ? "hidden" : ""}`}>
            {activity.name}
          </div>
          <div id="activity-state" className={`${!activity.state ? "hidden" : ""}`}>
            {activity.state}
          </div>
          <div id="activity-detail" className={`${!activity.details ? "hidden" : ""}`}>
            {activity.details}
          </div>
        </div>
      </div>
    </div>
  );
});
