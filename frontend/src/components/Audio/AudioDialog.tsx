import { Dialog } from "@mui/material";
import { Media } from "../../classes/Media";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  AudioDialogStyle,
  AudioLogo,
  AudioPlayerStyle,
} from "./audiodialog.style";
import { Headphones } from "@mui/icons-material";

const AudioDialog = ({
  media,
  open,
  setOpen,
  prevAudio,
  nextAudio,
}: {
  media: Media;
  open: boolean;
  setOpen: (val: boolean) => void;
  prevAudio: () => void;
  nextAudio: () => void;
}) => {
  return (
    <>
      {!media ? (
        <></>
      ) : (
        <Dialog
          sx={{ backdropFilter: "blur(3px)" }}
          PaperProps={{ sx: AudioDialogStyle }}
          open={open}
          onClose={() => setOpen(!open)}
        >
          <AudioLogo>
            <Headphones />
          </AudioLogo>
          <AudioPlayer
            style={AudioPlayerStyle}
            showSkipControls={true}
            autoPlay
            src={`${import.meta.env.VITE_BACKEND_URL}/api/audio?audio_dir=${
              media.path
            }`}
            onClickNext={nextAudio}
            onClickPrevious={prevAudio}
          />
        </Dialog>
      )}
    </>
  );
};

export default AudioDialog;
