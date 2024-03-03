import { Box, Button, styled } from "@mui/material";

export const PlaylistWrapper = styled(Box)({
    width: "100%",
});

export const NewPlaylist = styled(Box)({
    border: "3px solid #202020",
    height: "7rem",
    width: "7rem",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px",
    cursor: "pointer"
});

export const TopBar = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    background: "#f4f4f4"
});

export const DialogStyle = {
    width: "43rem",
    height: "50vh",
    overflow: "hidden",
};


export const DialogContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    padding: "12px",
    position: "relative",
    height: "100%"
});

export const CreateButton = styled(Button)({
    textTransform: "none",
    background: "#344955 !important",
    margin: "7px 0",
    color: "#fff",
});

export const MusicList = styled(Box)({
    flex: "1",
    overflow: "hidden",
    overflowY: "scroll"
});

export const MusicItem = styled(Box)({
    marginBottom: "12px",
    color: "#000",
    padding: "7px 4px",
    marginTop: "7px",

    "&:hover": {
        background: "#f4f4f4",
        cursor: "pointer"
    }
});