import Activity from "./Activity";
import DiscordUser from "./DiscordUser";
import SpotifyData from "./SpotifyData";

export default interface LanyardData {
  spotify?: SpotifyData;
  listening_to_spotify?: boolean;
  discord_user?: DiscordUser;
  discord_status?: "online" | "idle" | "dnd" | "offline";
  kv?: Record<string, string>;
  activities?: Activity[];
  active_on_discord_web?: boolean;
  active_on_discord_mobile?: boolean;
  active_on_discord_desktop?: boolean;
}
