import { Box, styled } from "@mui/material";

export const FloatingAudioPlayerContainer = styled(Box)({
    position: "fixed",
    bottom: "0",
    right: "0"
});

export const FloatingAudioPlayerBreakPoints = {
    bottom: {
        lg: "0",
        md: "0",
        sm: "3.2rem",
        xs: "3.2rem"
    }
};

export const AudioPlayerStyle = {
    width: "100%"
};

export const Buttons = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    background: "#fff"
});