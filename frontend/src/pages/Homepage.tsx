import { Box, styled } from "@mui/material";
import LeftSideBar from "../components/Homepage/LeftSideBar";
import AudioVideoSection from "../components/Homepage/AudioVideoSection";

const Container = styled(Box)({
  display: "flex",
});

function Homepage() {

  return (
    <>
      <Container>
        <LeftSideBar />
        <AudioVideoSection />
      </Container>
    </>
  );
}

export default Homepage;
