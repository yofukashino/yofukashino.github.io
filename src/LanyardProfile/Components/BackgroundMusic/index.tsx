import React from "react";
import Assets from "../../../assets";
import "./BackgroundMusic.css";
export default React.memo(({ loading, containerRef }: { loading: boolean, containerRef: React.RefObject<{ addEventListener: (event: string, callback: () => void) => void; removeEventListener: (event: string, callback: () => void) => void;  }> }): React.ReactElement => {
  const [audio, setAudio] = React.useState<HTMLAudioElement | undefined>();
  const [isPlaying, setPlaying] = React.useState<boolean>(false);
  React.useEffect(() => {
    const audio = new Audio(
      loading ? Assets.backgroundAudio.awkwardCricket : Assets.backgroundAudio.datenKazoo,
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
      audio.volume = 0.1;
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
      containerRef.current?.removeEventListener("click", playAndRemoveListener);
    };
    containerRef?.current?.addEventListener("click", playAndRemoveListener);
    return () => containerRef.current?.removeEventListener("click", playAndRemoveListener);
  }, [containerRef.current]);
  

  return (
    <div className="background-audio" key={`${isPlaying}`} data-tooltip={isPlaying? "pause" : "play"}>
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
