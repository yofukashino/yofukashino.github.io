import React from "react";
import Assets from "../../../assets";
import "./BackgroundMusic.css";
export default React.memo(({ loading }: { loading: boolean }): React.ReactElement => {
  const [audio, setAudio] = React.useState<HTMLAudioElement | undefined>();
  const [isPlaying, setPlaying] = React.useState<boolean>(false);
  React.useEffect(() => {
    const audio = new Audio(
      loading ? Assets.backgroundAudio.awkwardCricket : Assets.backgroundAudio.evangaylionKazoo,
    );
    setAudio(audio);
    return () => {
      audio?.pause();
      setAudio(null);
    };
  }, [loading]);
  React.useEffect(() => {
    if (audio && !audio.loop) {
      audio.loop = true;
      if (isPlaying) audio.play();
    }
  }, [audio]);
  React.useEffect(() => {
    if (!audio) return;
    if (isPlaying) audio.play();
    else audio.pause();
  }, [isPlaying]);
  React.useEffect(() => {
    const playAndRemoveListener = () => {
      setPlaying(() => true);
      document.body.removeEventListener("click", playAndRemoveListener);
    };
    document.body.addEventListener("click", playAndRemoveListener);
    return () => document.body.removeEventListener("click", playAndRemoveListener);
  }, []);
  return (
    <div className="background-audio" key={`${isPlaying}`}>
      <button
        onClick={() => {
          setPlaying((prev) => !prev);
        }}>
        <img
          className="pause-play"
          src={isPlaying ? Assets.backgroundAudio.pause : Assets.backgroundAudio.play}
          alt="plugin"
        />
      </button>
    </div>
  );
});
