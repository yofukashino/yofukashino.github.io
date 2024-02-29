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
  const [state, setStatus] = React.useState<LanyardData>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const SocketConstants: {
      heartbeat?: NodeJS.Timeout;
      socket?: WebSocket;
    } = {};

    const connectWebsocket = () => {
      if (SocketConstants.heartbeat) clearInterval(SocketConstants.heartbeat);

      SocketConstants.socket = new WebSocket(`wss://${Constants.API_URL}/socket`);
      setLoading(true);

      SocketConstants.socket.addEventListener("open", () => {
        SocketConstants.socket!.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: Constants.USER_ID,
            },
          }),
        );

        SocketConstants.heartbeat = setInterval(() => {
          SocketConstants.socket!.send(
            JSON.stringify({
              op: 3,
            }),
          );
        }, Constants.HEARTBEAT_INTERVAL);
      });

      SocketConstants.socket.addEventListener("message", ({ data }) => {
        const { t, d } = JSON.parse(data) as {
          t: "INIT_STATE" | "PRESENCE_UPDATE";
          d: LanyardData;
        };
        if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
          setStatus(d || ({} as LanyardData));
          if (loading && Object.keys(d).length !== 0) setLoading(false);
        }
      });

      SocketConstants.socket.addEventListener("close", connectWebsocket);
    };

    connectWebsocket();

    return () => {
      clearInterval(SocketConstants.heartbeat);
      SocketConstants.socket!.removeEventListener("close", connectWebsocket);
      SocketConstants.socket!.close();
    };
  }, []);

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

  React.useEffect(() => {
    try {
      const { discord_user, discord_status, activities, spotify } = state! ?? {};

      const currentActivity = activities?.find((activity) => activity.type !== 4);

      const statusActivity = activities?.find((activity) => activity.type === 4);

      const currentData: ProfileData = {
        avatar: `https://cdn.discordapp.com/avatars/${Constants.USER_ID}/${discord_user?.avatar}`,
        discordStatus: discord_status,
        username: `@${discord_user?.username}`,
        displayName: discord_user?.display_name ?? "",
        age: Utils.calculateAge(Constants.DATE_OF_BIRTH),
        status:
          discord_status !== "offline" && statusActivity?.state ? statusActivity?.state || "" : "",
        activity: {
          hidden: discord_status === "offline" || !currentActivity,
          bigImage: currentActivity?.assets?.large_image?.includes("spotify")
            ? spotify?.album_art_url!
            : "",
          bigImageTitle: currentActivity?.assets?.large_image?.includes("spotify")
            ? spotify?.album
            : "",
          smallImage: "",
          name: currentActivity?.name || "doing yo moma",
          state: currentActivity?.state || "",
          details: currentActivity?.details || "",
          timestamps: spotify?.timestamps,
        },
      };

      if (!currentActivity?.assets?.large_image?.includes("spotify")) {
        if (currentActivity?.assets?.large_image)
          currentData.activity.bigImage = currentActivity?.assets?.large_image?.includes("external")
            ? `https://media.discordapp.net/external/${
                currentActivity?.assets?.large_image.split("mp:external/")[1]
              }`
            : currentActivity?.assets?.large_image?.includes("mp:attachments")
            ? `https://cdn.discordapp.com/attachments/${
                currentActivity?.assets?.large_image.split("mp:attachments/")[1]
              }`.replace(/(\w+\/\w+\.\w+)\.\w+/, `$1`)
            : `https://cdn.discordapp.com/app-assets/${currentActivity?.application_id}/${currentActivity?.assets?.large_image}.png`;

        if (currentActivity?.assets?.small_image)
          currentData.activity.smallImage = currentActivity?.assets?.small_image?.includes(
            "external",
          )
            ? `https://media.discordapp.net/external/${
                currentActivity?.assets?.small_image?.split("mp:external/")[1]
              }`
            : currentActivity?.assets?.small_image?.includes("mp:attachments")
            ? `https://cdn.discordapp.com/attachments/${
                currentActivity?.assets?.small_image.split("mp:attachments/")[1]
              }`.replace(/(\w+\/\w+\.\w+)\.\w+/, `$1`)
            : `https://cdn.discordapp.com/app-assets/${currentActivity?.application_id}/${currentActivity?.assets?.small_image}.png`;
      }
      setProfileData((prevData) => ({
        ...prevData,
        ...currentData,
      }));
    } catch (err) {
      console.error(err);
    }
  }, [state, loading]);

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
