export default (
  discordStatus: string,
): {
  background?: string;
  title?: string;
  color?: string;
  opacity?: number;
} => {
  switch (discordStatus) {
    case "online":
      return {
        background: "#3ba45d",
        title: "Online",
        color: "#3ba45d",
        opacity: 1,
      };
    case "dnd":
      return {
        background: "#ed4245",
        title: "Do not disturb",
        color: "#ed4245",
        opacity: 1,
      };
    case "idle":
      return {
        background: "#faa81a",
        title: "Idle",
        color: "#faa81a",
        opacity: 1,
      };
    case "offline":
      return {
        background: "#747e8c",
        title: "Offline",
        color: "unset",
        opacity: 0.5,
      };
    default:
      return {};
  }
};
