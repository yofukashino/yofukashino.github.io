import React from "react";
import Constants from "../constants";
import assets from "../assets";
import Utils from "./Utils";
import UserProfile from "./Components/UserProfile";
import Activity from "./Components/Activity";
import AboutMe from "./Components/AboutMe";
import { LanyardData, ProfileData } from "./Types";
import "./LanyardProfile.css";
import Loading from "./Components/Loading";

export default React.memo(() => {
  const [rawData, setRawData] = React.useState<LanyardData>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [profileData, setProfileData] = React.useState<ProfileData>({
    avatar: assets.loader as string,
    discordStatus: "",
    displayName: "",
    username: "",
    status: "",
    age: 0,
    activity: {
      hidden: true,
      bigImage: "",
      smallImage: "",
      name: "",
      state: "",
      details: "",
    },
  });
  const SocketConstants = React.useRef<{
    heartbeat?: NodeJS.Timeout | null;
    socket?: WebSocket | null;
  }>({});

  React.useEffect(() => {
    const connectWebsocket = () => {
      if (SocketConstants.current.heartbeat) clearInterval(SocketConstants.current.heartbeat);
      SocketConstants.current.socket = new WebSocket(`wss://${Constants.API_URL}/socket`);

      setLoading(true);

      SocketConstants.current.socket.addEventListener("open", () => {
        SocketConstants.current.socket!.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: Constants.USER_ID,
            },
          }),
        );
        SocketConstants.current.heartbeat = setInterval(() => {
          SocketConstants.current.socket!.send(
            JSON.stringify({
              op: 3,
            }),
          );
        }, Constants.HEARTBEAT_INTERVAL);
      });

      SocketConstants.current.socket.addEventListener("message", ({ data }) => {
        const { t, d } = JSON.parse(data) as {
          t: "INIT_STATE" | "PRESENCE_UPDATE";
          d: LanyardData;
        };
        if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
          setRawData(d || {});
          if (loading && Object.keys(d).length !== 0) setLoading(false);
        }
      });

      SocketConstants.current.socket.addEventListener("close", connectWebsocket);
    };

    connectWebsocket();

    return () => {
      clearInterval(SocketConstants.current.heartbeat);
      SocketConstants.current.socket!.removeEventListener("close", connectWebsocket);
      SocketConstants.current.socket!.close();
    };
  }, []);

  React.useEffect(() => {
    try {
      const currentData = Utils.mapRawData(rawData);
      setProfileData((prevData) => ({
        ...prevData,
        ...currentData,
      }));
    } catch (err) {
      console.error(err);
    }
  }, [rawData, loading]);

  return (
    <div className="wrapper" key={`${loading}`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <UserProfile {...profileData} />
          <Activity {...profileData} />
          <AboutMe {...profileData} />
        </>
      )}
    </div>
  );
});
