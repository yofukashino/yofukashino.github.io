import React from "react";
import Constants from "../../../constants";
import { ProfileData } from "../../Types";
import "./AboutMe.css";
export default React.memo(({ age }: ProfileData) => {
  return (
    <div className="card">
      <div className="card-title">@{Constants.USER} &gt; about me</div>
      <div className="about-me">
        <header className="heading">about me</header>
        <div className="bio">
          <ul>
            <li>ϡ {age} years old</li>
            <li>ϡ straight male</li>
            <li>ϡ commited to the love</li>
            <li>ϡ cultured degenrate weeb</li>
            <li>ϡ indian</li>
            <br />
            <li>UPI ID for donations: 7988492002@fam</li>
            <li>
              You can donate on my <a href="https://ko-fi.com/tharki">KO-FI</a> too
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
