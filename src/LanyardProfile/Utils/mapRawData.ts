import Constants from "../../constants";
import Utils from "../Utils";

import { LanyardData, ProfileData } from "../Types";
export default (rawData: LanyardData): ProfileData => {
  const { discord_user, discord_status, activities, spotify } = rawData ?? {};

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
      bigImage:
        !currentActivity?.assets?.large_image?.includes("spotify") &&
        currentActivity?.assets?.large_image
          ? currentActivity?.assets?.large_image?.includes("external")
            ? `https://media.discordapp.net/external/${
                currentActivity?.assets?.large_image.split("mp:external/")[1]
              }`
            : currentActivity?.assets?.large_image?.includes("mp:attachments")
            ? `https://cdn.discordapp.com/attachments/${
                currentActivity?.assets?.large_image.split("mp:attachments/")[1]
              }`.replace(/(\w+\/\w+\.\w+)\.\w+/, `$1`)
            : `https://cdn.discordapp.com/app-assets/${currentActivity?.application_id}/${currentActivity?.assets?.large_image}.png`
          : currentActivity?.assets?.large_image?.includes("spotify")
          ? spotify?.album_art_url
          : "",
      bigImageTitle: currentActivity?.assets?.large_image?.includes("spotify")
        ? spotify?.album
        : "",
      smallImage: currentActivity?.assets?.small_image
        ? currentActivity?.assets?.small_image?.includes("external")
          ? `https://media.discordapp.net/external/${
              currentActivity?.assets?.small_image?.split("mp:external/")[1]
            }`
          : currentActivity?.assets?.small_image?.includes("mp:attachments")
          ? `https://cdn.discordapp.com/attachments/${
              currentActivity?.assets?.small_image.split("mp:attachments/")[1]
            }`.replace(/(\w+\/\w+\.\w+)\.\w+/, `$1`)
          : `https://cdn.discordapp.com/app-assets/${currentActivity?.application_id}/${currentActivity?.assets?.small_image}.png`
        : "",
      name: currentActivity?.name || "doing yo moma",
      state: currentActivity?.state || "",
      details: currentActivity?.details || "",
      timestamps: spotify?.timestamps,
    },
  };

  return currentData;
};
