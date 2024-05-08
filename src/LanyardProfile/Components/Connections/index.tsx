import React from "react";
import Assets from "../../../assets";
import "./Connections.css";
export default React.memo(() => {
  const [shown, setShown] = React.useState(false);
  return (
    <div className={`connections${shown ? " shown" : ""}`}>
      <span
        data-tooltip={shown ? "hide connections" : "show connections"}
        onClick={() => setShown((prev) => !prev)}>
        {shown ? (
          <Assets.connections.less className="show-button" />
        ) : (
          <Assets.connections.more className="show-button" />
        )}
      </span>
      {shown && (
        <>
          <a data-tooltip="github" href="https://github.com/yofukashino">
            <Assets.connections.github className="connection-icon" />
          </a>
          <a data-tooltip="loneweeb" href="https://discord.com/users/1121961711080050780/">
            <Assets.connections.discord className="connection-icon" />
          </a>
          <a data-tooltip="support server" href="https://discord.com/invite/SgKSKyh9gY">
            <Assets.connections.support className="connection-icon" />
          </a>
          <a data-tooltip="rp plugins" href="https://github.com/yofukashino/RepluggedPlugins">
            <Assets.connections.plugin className="connection-icon" />
          </a>
          <a data-tooltip="instagram" href="https://www.instagram.com/yofukashino/">
            <Assets.connections.insta className="connection-icon" />
          </a>
          <a data-tooltip="youtube" href="https://www.youtube.com/channel/UCYQnV4Z-TOVuyBVWjkBKZtg">
            <Assets.connections.youtube className="connection-icon" />
          </a>
          <a data-tooltip="twitch" href="https://www.twitch.tv/yofukashi_no">
            <Assets.connections.twitch className="connection-icon" />
          </a>
        </>
      )}
    </div>
  );
});
