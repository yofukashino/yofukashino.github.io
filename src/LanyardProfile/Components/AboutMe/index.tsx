import React from "react";
import Constants from "../../../constants";
import BackgroundMusic from "../BackgroundMusic";
import { ProfileData } from "../../Types";
import "./AboutMe.css";
export default React.memo(({ age }: ProfileData) => {
  const containerRef = React.useRef();
  return (
    <div className="card" ref={containerRef}>
      <div className="card-title">@{Constants.USER} &gt; about me</div>
      <div className="about-me">
        <header className="heading">about me</header>
        <div className="bio">
          <ul>
            <li>• currently {age}</li>
            <li>• reincarnation of degenracy</li>
            <li>• indian</li>
            <br />
            <li>৹ UPI ID for donations: yofukashinooo@oksbi</li>
            <li>
              ৹ You can donate on my{" "}
              <a data-tooltip="Accepts Paypal and Stripe" href="https://ko-fi.com/yofukashino">
                {" "}
                KO-FI{" "}
              </a>{" "}
              too
            </li>
          </ul>
        </div>
        <BackgroundMusic loading={false} containerRef={containerRef} />
      </div>
    </div>
  );
});
