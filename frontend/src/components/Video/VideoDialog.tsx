import { Box, Dialog, IconButton, Slider, Typography } from "@mui/material";
import { useRef, useState } from "react";
import {
  PlayArrow,
  Pause,
  Replay10,
  Forward10,
  OpenInFull,
  ArrowBack,
  ArrowForward,
  ArrowBackIosNew,
} from "@mui/icons-material";
import ReactPlayer from "react-player";
import {
  ButtonsContainer,
  ControlBar,
  ControlButtons,
  ControlsContainer,
  DialogStyle,
  SliderContainer,
  VideoTitle,
} from "./videoDialog.style";
import { Media } from "../../classes/Media";

const VideoDialog = ({
  media,
  open,
  setOpen,
  prevVideo,
  nextVideo,
}: {
  media: Media;
  open: boolean;
  setOpen: (val: boolean) => void;
  prevVideo: () => void;
  nextVideo: () => void;
}) => {
  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    Buffer: true,
  });

  const videoPlayerRef = useRef(null);

  const { playing, muted, volume, playbackRate, played, seeking, buffer } =
    videoState;

  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    videoPlayerRef?.current?.seekTo(
      videoPlayerRef?.current?.getCurrentTime() - 10
    );
  };

  const forwardHandler = () => {
    videoPlayerRef?.current?.seekTo(
      videoPlayerRef?.current?.getCurrentTime() + 10
    );
  };

  const progressHandler = (state: object) => {
    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  return (
    <>
      {!media ? (
        <></>
      ) : (
        <Dialog
          open={open}
          onClose={() => setOpen(!open)}
          PaperProps={{
            style: DialogStyle,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <ReactPlayer
              ref={videoPlayerRef}
              className="player"
              url={`${import.meta.env.VITE_BACKEND_URL}/api/video?video_dir=${
                media.path
              }`}
              playing={playing}
              muted={muted}
              onProgress={progressHandler}
            />
            <ControlsContainer>
              <VideoTitle>
                <IconButton onClick={() => setOpen(!open)}>
                  <ArrowBackIosNew />
                </IconButton>
                <Typography>{media.name}</Typography>
                <Typography></Typography>
              </VideoTitle>
              <ControlBar>
                <SliderContainer>
                  <Slider min={0} max={100} value={played * 100} />
                </SliderContainer>
                <ButtonsContainer>
                  <ControlButtons>
                    <IconButton onClick={prevVideo}>
                      <ArrowBack />
                    </IconButton>
                    <IconButton onClick={rewindHandler}>
                      <Replay10 />
                    </IconButton>
                    <IconButton onClick={playPauseHandler}>
                      {playing ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton onClick={forwardHandler}>
                      <Forward10 />
                    </IconButton>
                    <IconButton onClick={nextVideo}>
                      <ArrowForward />
                    </IconButton>
                    <IconButton>
                      <OpenInFull />
                    </IconButton>
                  </ControlButtons>
                </ButtonsContainer>
              </ControlBar>
            </ControlsContainer>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default VideoDialog;
