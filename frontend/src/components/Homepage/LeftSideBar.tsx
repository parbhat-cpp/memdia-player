import { useAtom } from "jotai";
import { currentOptionAtom } from "../../state-management/atom/global_state";
import { options } from "../../constants/constant";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ContainerBreakPoints,
  IconOptionBreakPoints,
  OptionsContainer,
  OptionsContainerBreakPoints,
  TextOptionBreakPoints,
} from "./leftSideBar.style";
import { Box } from "@mui/material";
import { History, List, MusicNote, PlayArrow } from "@mui/icons-material";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const [, setCurrentOption] = useAtom(currentOptionAtom);

  const onOptionSelected = (option: string) => {
    if (option === "playlist" || option === "history") {
      navigate(`/${option}`);
      return;
    }
    setCurrentOption(option);
  };

  const getIcons = (option: string) => {
    if (option == "videos") {
      return <PlayArrow />;
    } else if (option == "audios") {
      return <MusicNote />;
    } else if (option == "playlist") {
      return <List />;
    } else {
      return <History />;
    }
  };

  return (
    <Container sx={ContainerBreakPoints}>
      {options.map((option, i) => (
        <OptionsContainer
          sx={OptionsContainerBreakPoints}
          key={option.title + i}
          onClick={() => onOptionSelected(option.option)}
        >
          <Box sx={TextOptionBreakPoints}>{option.title}</Box>
          <Box sx={IconOptionBreakPoints}>{getIcons(option.option)}</Box>
        </OptionsContainer>
      ))}
    </Container>
  );
};

export default LeftSideBar;
