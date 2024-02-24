import { useAtom } from "jotai";
import {
  currentOptionAtom,
  floatingAudioAtom,
  osAtom,
} from "../../state-management/atom/global_state";
import { useEffect, useState } from "react";
import { Media } from "../../classes/Media";
import {
  AudioWrapper,
  Container,
  ContainerBreakPoints,
  VideoContainer,
} from "./audioVideoSection.style";
import { Audiotrack, Folder, PlayCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import VideoDialog from "../Video/VideoDialog";
import AudioDialog from "../Audio/AudioDialog";
import { ellipsis } from "../../util/functions";
import FloatingPlayer from "../FloatingAudioPlayer/FloatingPlayer";
import Playlist from "../Playlist/Playlist";

const videoArray: Array<Media> = new Array<Media>();
const audioArray: Array<Media> = new Array<Media>();

const AudioVideoSection = () => {
  const [currentOption] = useAtom(currentOptionAtom);
  const [os, setOs] = useAtom(osAtom);
  const [videos, setVideos] = useState(new Array<Media>());
  const [audios, setAudios] = useState(new Array<Media>());
  const [currentVideo, setCurrentVideo] = useState(-1);
  const [currentAudio, setCurrentAudio] = useState(-1);
  const [openVideo, setOpenVideo] = useState(false);
  const [openAudio, setOpenAudio] = useState(false);
  const [openFloatingAudio, setOpenFloatingAudio] = useAtom(floatingAudioAtom);

  const fetchDefaultVideos = async (os: string) => {
    if (videoArray.length) {
      videoArray.splice(0, videoArray.length);
      setVideos([]);
    }
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/video/${os}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach(
          (
            element: { path: string; name: string; type: string },
            i: number
          ) => {
            const newMedia: Media = new Media(
              element.path,
              element.name,
              element.type,
              i
            );
            videoArray.push(newMedia);
          }
        );
        setVideos(videoArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVideosFromDirectory = async (directoryPath: string) => {
    if (videoArray.length) {
      videoArray.splice(0, videoArray.length);
      setVideos([]);
    }
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/video/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video_dir: directoryPath }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach(
          (
            element: { path: string; name: string; type: string },
            i: number
          ) => {
            const newMedia: Media = new Media(
              element.path,
              element.name,
              element.type,
              i
            );
            videoArray.push(newMedia);
          }
        );
        setVideos(videoArray);
      })
      .catch((err) => console.log(err));
  };

  const fetchDefaultAudios = async (os: string) => {
    if (audioArray.length) {
      audioArray.splice(0, audioArray.length);
      setAudios([]);
    }
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/audio/${os}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach(
          (
            element: { path: string; name: string; type: string },
            i: number
          ) => {
            const newMedia: Media = new Media(
              element.path,
              element.name,
              element.type,
              i
            );
            audioArray.push(newMedia);
          }
        );
        setAudios(audioArray);
      })
      .catch((err) => console.log(err));
  };

  const fetchAudiosFromDirectory = (directoryPath: string) => {
    console.log(directoryPath);
  };

  useEffect(() => {
    setOs(navigator.platform);
    fetchDefaultVideos(os);
    fetchDefaultAudios(os);
  }, [os, setOs]);

  const onVideoClicked = (videoId: number) => {
    setCurrentVideo(videoId);
    setOpenVideo(true);
  };

  const onVideoClose = () => {
    setCurrentVideo(-1);
    setOpenVideo(!openVideo);
  };

  const handleVideoNext = () => {
    const nextIndex: number = (currentVideo + 1) % videos.length;
    if (videos[nextIndex].type !== "DIRECTORY") {
      setCurrentVideo(nextIndex);
    }
  };

  const handleVideoPrev = () => {
    const nextIndex: number = (currentVideo - 1) % videos.length;
    if (videos[nextIndex].type !== "DIRECTORY") {
      setCurrentVideo(nextIndex);
    }
  };

  const onAudioClicked = (audioId: number) => {
    setCurrentAudio(audioId);
    setOpenAudio(true);
  };

  const handleAudioNext = () => {
    const nextIndex: number = (currentAudio + 1) % audios.length;
    if (audios[nextIndex].type !== "DIRECTORY") {
      setCurrentAudio(nextIndex);
    }
  };

  const handleAudioPrev = () => {
    const nextIndex: number = (currentAudio - 1) % audios.length;
    if (audios[nextIndex].type !== "DIRECTORY") {
      setCurrentAudio(nextIndex);
    }
  };

  return (
    <>
      <Container sx={ContainerBreakPoints}>
        {currentOption === "videos" ? (
          videos.map((video, i) => (
            <VideoContainer>
              {video.type !== "DIRECTORY" ? (
                <div onClick={() => onVideoClicked(i)}>
                  <PlayCircle
                    style={{ height: 125, width: 125, margin: "0 auto" }}
                  />
                </div>
              ) : (
                <div onClick={() => fetchVideosFromDirectory(video.path)}>
                  <Folder
                    style={{ height: 125, width: 125, margin: "0 auto" }}
                  />
                </div>
              )}
              <Typography>{video.name}</Typography>
            </VideoContainer>
          ))
        ) : currentOption === "audios" ? (
          audios.map((audio, i) => (
            <AudioWrapper>
              {audio.type !== "DIRECTORY" ? (
                <div onClick={() => onAudioClicked(i)}>
                  <Audiotrack
                    style={{ height: 125, width: 125, margin: "0 auto" }}
                  />
                </div>
              ) : (
                <div onClick={() => fetchAudiosFromDirectory(audio.path)}>
                  <Folder
                    style={{ height: 125, width: 125, margin: "0 auto" }}
                  />
                </div>
              )}
              <Typography>{ellipsis(audio.name)}</Typography>
            </AudioWrapper>
          ))
        ) : currentOption === "playlist" ? (
          <Playlist />
        ) : (
          <>history</>
        )}
        <VideoDialog
          media={videos[currentVideo]}
          open={openVideo}
          setOpen={onVideoClose}
          prevVideo={handleVideoPrev}
          nextVideo={handleVideoNext}
        />
        <AudioDialog
          media={audios[currentAudio]}
          open={openAudio}
          setOpen={setOpenAudio}
          prevAudio={handleAudioPrev}
          nextAudio={handleAudioNext}
        />
        <FloatingPlayer
          media={audios[currentAudio]}
          open={openFloatingAudio}
          setOpen={setOpenFloatingAudio}
          prevAudio={handleAudioPrev}
          nextAudio={handleAudioNext}
        />
      </Container>
    </>
  );
};

export default AudioVideoSection;
