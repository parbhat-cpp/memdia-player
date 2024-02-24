import { Dialog, IconButton } from "@mui/material";
import { Media } from "../../classes/Media";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  AudioDialogStyle,
  AudioLogo,
  AudioPlayerStyle,
  AudioTitle,
  TopBar,
  TopBarButtons,
} from "./audiodialog.style";
import { Close, Headphones, Minimize } from "@mui/icons-material";
import { useAtom } from "jotai";
import { floatingAudioAtom } from "../../state-management/atom/global_state";

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
  const [, setOpenFloatingAudio] = useAtom(floatingAudioAtom);

  const onMinimizeClicked = () => {
    setOpenFloatingAudio(true);
    setOpen(!open);
  };

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
          <TopBar>
            <AudioTitle>{media.name}</AudioTitle>
            <TopBarButtons>
              <IconButton onClick={onMinimizeClicked}>
                <Minimize />
              </IconButton>
              <IconButton onClick={() => setOpen(!open)}>
                <Close />
              </IconButton>
            </TopBarButtons>
          </TopBar>
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
