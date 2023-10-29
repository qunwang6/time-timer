import { useCallback, useEffect, useState } from "react";
import {Howl, Howler} from "howler";

interface IPermissionOption {
  autoplayWhenAccepted?: boolean;
}

interface IPlayOption {
  replay?: boolean;
}

const dummyAudioSrc =
  "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";


const sound = new Howl({
  src: dummyAudioSrc,
  volume: 1.0, // Adjust the volume as needed (0.0 to 1.0)
});



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

      audio.onloadeddata = () => {

        audio.play();
      };

      audio.onended = () => {
        audio.src = src;
        audio.onloadeddata = () => {
          setIsPlayable(true);
          audio.onloadeddata = null;

          if (autoplayWhenAccepted) audio.play();
        };
        audio.onended = null;
      };

      audio.src = dummyAudioSrc;
    },
    [audio, isPlayable, src]
  );

  const play = useCallback(
    ({ replay = false }: IPlayOption = {}) => {

     
      
      sound.play();
      
    //   if (!audio) return;


    //   if (!isPlayable) return;
    // //error
    //   if (replay) audio.currentTime = 0;
      
    //   audio.play();


    },
    [audio, isPlayable]
  );

  return [getPermission, play, isPlayable];
}
