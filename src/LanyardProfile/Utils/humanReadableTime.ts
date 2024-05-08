export default (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const paddedHours = hours ? `${hours.toString().padStart(2, "0")}:` : "";
  const paddedMinutes = `${minutes.toString().padStart(2, "0")}:`;
  const paddedSeconds = seconds.toString().padStart(2, "0");

  return `${paddedHours}${paddedMinutes}${paddedSeconds}`;
};
