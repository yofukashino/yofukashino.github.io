import React from "react";
import Utils from "../../Utils";
import "./Timebar.css";
export default React.memo((timestamps: { start: number; end: number }) => {
  const { start, end } = timestamps;
  const [passedTime, setPassedTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  React.useEffect(() => {
    const duration = (end - start) / 1e3;
    setDuration(duration);
    const interval = setInterval(() => {
      setPassedTime(Math.max(Math.min((Date.now() - start) / 1e3, duration), 0));
    }, 500);

    return () => clearInterval(interval);
  }, [start, end]);
  return (
    <div className="timebar-container">
      <div className="timebar-mainBackground" ><div
        className="timebar-main"
        style={{
          width: "".concat(`${100 * Math.max(Math.min(passedTime / duration, 1), 0)}`, "%"),
        }}
      /></div>
      
      <div className="timebar-timestamps">
        <div className="timebar-passedTime">{Utils.humanReadableTime(passedTime)}</div>
        <div className="timebar-durration">{Utils.humanReadableTime(duration)}</div>
      </div>
    </div>
  );
});
