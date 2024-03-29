import { Box, Typography, styled } from "@mui/material";

export const AudioDialogStyle = {
    background: "#000",
    width: {
        lg: "70vw",
        md: "95vw",
        sm: "95vw",
        xs: "95vw"
    },
    height: "60vh",
    boxShadow: "none",
    borderRadius: "10px 10px 10px 10px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
};

export const TopBar = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    top: "0"
});

export const TopBarButtons = styled(Box)({

});

export const AudioTitle = styled(Typography)({
    display: "flex",
    alignItems: "center",
    marginLeft: "15px",
    fontSize: "14px",
    color: "#141414",
    letterSpacing: "1px"
});

export const AudioPlayerStyle = {
    position: "absolute",
    bottom: "0",
};

export const AudioLogo = styled(Box)({
    height: "100%",
    width: "100%",
    background: "linear-gradient(45deg, #484c4c, #fff)",
    display: "flex",
    justifyContent: "center",

    "&>svg": {
        color: "#636363",
        fontSize: "14rem",
        position: "absolute",
        top: "1.8rem"
    }
})