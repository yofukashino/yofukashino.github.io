import React from "react";
import Assets from "../../../assets";
import "./Connections.css";
export default React.memo(() => {
  return (
    <div className="connections">
      <a title="github" href="https://github.com/Tharki-God">
        <img className="connection-icon" src={Assets.connections.github} alt="github" />
      </a>
      <a title="loneweeb" href="https://discord.com/users/1025214794766221384/">
        <img className="connection-icon" src={Assets.connections.discord} alt="discord" />
      </a>
      <a title="support server" href="https://discord.com/invite/SgKSKyh9gY">
        <img className="connection-icon" src={Assets.connections.support} alt="support" />
      </a>
      <a title="rp plugins" href="https://github.com/Tharki-God/RepluggedPlugins">
        <img className="connection-icon" src={Assets.connections.plugin} alt="plugin" />
      </a>
      <a title="instagram" href="https://www.instagram.com/tharki_ahlawat/">
        <img className="connection-icon" src={Assets.connections.insta} alt="instagram" />
      </a>
      <a title="youtube" href="https://www.youtube.com/channel/UCYQnV4Z-TOVuyBVWjkBKZtg">
        <img className="connection-icon" src={Assets.connections.youtube} alt="youtube" />
      </a>
      <a title="twitch" href="https://www.twitch.tv/tharki_ahlawat">
        <img className="connection-icon" src={Assets.connections.twitch} alt="twitch" />
      </a>
    </div>
  );
});
