import { Box, styled } from "@mui/material";

export const Container = styled(Box)({
    background: "#484c4c",
    display: "grid",
    overflow: "hidden",
    overflowY: "auto"
});

export const ContainerBreakPoints = {
    flex: {
        lg: "0.8",
        md: "0.8",
        sm: "1",
        xs: "1"
    },
    gridTemplateColumns: {
        lg: "auto auto auto",
        md: "auto auto auto",
        sm: "auto auto",
        xs: "auto"
    }
}

export const VideoContainer = styled(Box)({
    height: "16rem",
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
    maxHeight: "19rem",
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