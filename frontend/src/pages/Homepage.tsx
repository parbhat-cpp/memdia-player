import { Box, styled } from "@mui/material";
import LeftSideBar from "../components/Homepage/LeftSideBar";
import AudioVideoSection from "../components/Homepage/AudioVideoSection";

const Container = styled(Box)({
  height: "100vh",
  width: "100vw",
  display: "flex",
});

const BreakPointStyles = {
  flexDirection: {
    lg: "row",
    md: "row",
    sm: "column-reverse",
    xs: "column-reverse"
  }
}

function Homepage() {

  return (
    <>
      <Container sx={BreakPointStyles}>
        <LeftSideBar />
        <AudioVideoSection />
      </Container>
    </>
  );
}

export default Homepage;
