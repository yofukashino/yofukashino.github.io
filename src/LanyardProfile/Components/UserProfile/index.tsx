import Connections from "../Connections";
import Constants from "../../../constants";
import Utils from "../../Utils";
import { ProfileData } from "../../Types";
import "./UserProfile.css";
export default ({ avatar, discordStatus, displayName, username }: ProfileData) => {
  return (
    <div className="card">
      <div className="card-title">@{Constants.USER} &gt; home</div>
      <div className="user-profile">
        <div className="profile-pic">
          <img id="pfp" src={avatar} alt="" />
          <div
            id="status-dot"
            aria-label={discordStatus}
            style={Utils.getStatusStyles(discordStatus)}></div>
        </div>
        <div className="user-info">
          {displayName ? (
            <>
              <div id="display-name">{displayName}</div>
              <div id="username-secondary">{username}</div>
            </>
          ) : (
            <div id="username">{username}</div>
          )}
          <div id="status">{status}</div>
          <div id="status2" style={{ color: Utils.getStatusStyles(discordStatus).color }}>
            {discordStatus !== "offline" ? discordStatus : "unknown"}
          </div>
          <Connections />
        </div>
      </div>
    </div>
  );
};
