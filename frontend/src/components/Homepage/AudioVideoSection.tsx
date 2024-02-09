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
  VideoContainer,
} from "./audioVideoSection.style";
import { Folder, PlayCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import VideoDialog from "../Video/VideoDialog";

const mediaArray: Array<Media> = new Array<Media>();

const AudioVideoSection = () => {
  const [currentOption] = useAtom(currentOptionAtom);
  const [os, setOs] = useAtom(osAtom);
  const [videos, setVideos] = useState(new Array<Media>());
  const [currentVideo, setCurrentVideo] = useState(-1);
  const [openVideo, setOpenVideo] = useState(false);

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

  useEffect(() => {
    setOs(navigator.platform);
    if (currentOption === options[0].option) {
      fetchDefaultVideos(os);
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

  return (
    <Container>
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
                <Folder style={{ height: 125, width: 125, margin: "0 auto" }} />
              </div>
            )}
            <Typography>{video.name}</Typography>
          </VideoContainer>
        ))
      ) : currentOption === "audios" ? (
        <AudioWrapper></AudioWrapper>
      ) : (
        ""
      )}
      <VideoDialog
        media={videos[currentVideo]}
        open={openVideo}
        setOpen={onVideoClose}
        prevVideo={handleVideoPrev}
        nextVideo={handleVideoNext}
      />
    </Container>
  );
};

export default AudioVideoSection;
