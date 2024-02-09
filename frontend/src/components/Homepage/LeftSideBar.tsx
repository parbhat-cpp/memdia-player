import { Box, styled } from "@mui/material";
import { useAtom } from "jotai";
import { currentOptionAtom } from "../../state-management/atom/global_state";
import { options } from "../../constants/constant";

const Container = styled(Box)({
  display: "flex",
  flex: "0.2",
  background: "#f48b00",
  height: "100vh",
  flexDirection: "column",
});

const OptionsContainer = styled(Box)({
  width: "100%",
  margin: "2rem",
  cursor: "pointer",
  fontSize: "27px",
  transition: "all 250ms ease",
  color: "#f4f4f4",

  "&:hover": {
    fontSize: "36px",
    color: "#fff",
  },
});

const LeftSideBar = () => {
  const [, setCurrentOption] = useAtom(currentOptionAtom);

  const onOptionSelected = (option: string) => {
    setCurrentOption(option);
  };

  return (
    <Container>
      {options.map((option, i) => (
        <OptionsContainer
          key={option.title + i}
          onClick={() => onOptionSelected(option.option)}
        >
          {option.title}
        </OptionsContainer>
      ))}
    </Container>
  );
};

export default LeftSideBar;
