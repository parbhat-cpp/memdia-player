import { useAtom } from "jotai";
import {
  currentOptionAtom,
  osAtom,
} from "../../state-management/atom/global_state";
import { useEffect, useState } from "react";
import { options } from "../../constants/constant";
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
import { ellipsis } from '../../util/functions';

const mediaArray: Array<Media> = new Array<Media>();

const AudioVideoSection = () => {
  const [currentOption] = useAtom(currentOptionAtom);
  const [os, setOs] = useAtom(osAtom);
  const [videos, setVideos] = useState(new Array<Media>());
  const [audios, setAudios] = useState(new Array<Media>());
  const [currentVideo, setCurrentVideo] = useState(-1);
  const [currentAudio, setCurrentAudio] = useState(-1);
  const [openVideo, setOpenVideo] = useState(false);
  const [openAudio, setOpenAudio] = useState(false);

  const fetchDefaultVideos = async (os: string) => {
    if (mediaArray.length) {
      mediaArray.splice(0, mediaArray.length);
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
            mediaArray.push(newMedia);
          }
        );
        setVideos(mediaArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVideosFromDirectory = async (directoryPath: string) => {
    if (mediaArray.length) {
      mediaArray.splice(0, mediaArray.length);
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
            mediaArray.push(newMedia);
          }
        );
        setVideos(mediaArray);
      })
      .catch((err) => console.log(err));
  };

  const fetchDefaultAudios = async (os: string) => {
    if (mediaArray.length) {
      mediaArray.splice(0, mediaArray.length);
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
            mediaArray.push(newMedia);
          }
        );
        setAudios(mediaArray);
      })
      .catch((err) => console.log(err));
  };

  const fetchAudiosFromDirectory = (directoryPath: string) => {
    console.log(directoryPath);
  };

  useEffect(() => {
    setOs(navigator.platform);
    if (currentOption === options[0].option) {
      fetchDefaultVideos(os);
    } else if (currentOption === options[1].option) {
      fetchDefaultAudios(os);
    }
  }, [currentOption, os, setOs]);

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
    <Container sx={ContainerBreakPoints}>
      {currentOption === "videos"
        ? videos.map((video, i) => (
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
        : currentOption === "audios"
        ? audios.map((audio, i) => (
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
        : ""}
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
    </Container>
  );
};

export default AudioVideoSection;
