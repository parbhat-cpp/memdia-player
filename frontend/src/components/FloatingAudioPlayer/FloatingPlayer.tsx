import {
  AudioPlayerStyle,
  Buttons,
  FloatingAudioPlayerBreakPoints,
  FloatingAudioPlayerContainer,
} from "./floatingPlayer.style";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Media } from "../../classes/Media";
import { IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const FloatingPlayer = ({
  media,
  open,
  setOpen,
  nextAudio,
  prevAudio,
}: {
  media: Media;
  open: boolean;
  setOpen: (val: boolean) => void;
  nextAudio: () => void;
  prevAudio: () => void;
}) => {
  return (
    <>
      {open ? (
        <FloatingAudioPlayerContainer sx={FloatingAudioPlayerBreakPoints}>
          <Buttons>
            <Typography>{media?.name}</Typography>
            <IconButton onClick={() => setOpen(!open)}>
              <Close />
            </IconButton>
          </Buttons>
          <AudioPlayer
            style={AudioPlayerStyle}
            showSkipControls={true}
            autoPlay
            src={`${import.meta.env.VITE_BACKEND_URL}/api/audio?audio_dir=${
              media?.path
            }`}
            onClickNext={nextAudio}
            onClickPrevious={prevAudio}
          />
        </FloatingAudioPlayerContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default FloatingPlayer;
