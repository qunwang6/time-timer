import { useCallback, useEffect, useState } from "react";

interface IPermissionOption {
  autoplayWhenAccepted?: boolean;
}

interface IPlayOption {
  replay?: boolean;
}

const dummyAudioSrc =
  "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

export default function useAudio(
  src: string | undefined | null
): [
  (option?: IPermissionOption) => void,
  (option?: IPlayOption) => void,
  boolean
] {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlayable, setIsPlayable] = useState(false);

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  const getPermission = useCallback(
    ({ autoplayWhenAccepted = false }: IPermissionOption = {}) => {
      if (!audio) return;
      if (isPlayable) return;
      if (!src || src === "") return;

      // Ensure user interaction
      document.addEventListener("click", function playAudio() {
        audio.play().then(() => {
          setIsPlayable(true);
          if (autoplayWhenAccepted) audio.play();
        });
        // Remove the listener after playback is initiated
        document.removeEventListener("click", playAudio);
      });
    },
    [audio, isPlayable, src]
  );

  const play = useCallback(
    ({ replay = false }: IPlayOption = {}) => {
      if (!audio) return;
      if (!isPlayable) return;

      if (replay) audio.currentTime = 0;
      audio.play();
    },
    [audio, isPlayable]
  );

  return [getPermission, play, isPlayable];
}
