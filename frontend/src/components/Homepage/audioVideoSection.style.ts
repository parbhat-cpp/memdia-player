import { Box, styled } from "@mui/material";

export const Container = styled(Box)({
    background: "#484c4c",
    display: "grid",
    flex: "0.8",
    gridTemplateColumns: "auto auto auto",
});

export const VideoContainer = styled(Box)({
    margin: "25px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    borderRadius: "12px",

    "&:hover": {
        background: "#414141",
    },
});

export const AudioWrapper = styled(Box)({
    margin: "25px",
    cursor: "pointer",
});