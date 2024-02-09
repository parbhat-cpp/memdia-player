import { Box, keyframes, styled } from "@mui/material";

export const Container = styled(Box)({
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

export const DialogStyle = {
    background: "#000",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    borderRadius: "10px 10px 10px 10px",
    overflow: "hidden",
};

const invisible = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `;

const visible = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

export const ControlsContainer = styled(Box)({
    zIndex: "1",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
    animation: `${invisible} 1200ms forwards`,

    "&:hover": {
        animation: `${visible} 1200ms forwards`,
    },
});

export const VideoTitle = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "0.4rem 0.8rem",
    color: "white",
    letterSpacing: "1.2px",
    background: "#01010199",

    "&>button>svg": {
        color: "white",
        fontSize: "15px",
    },
});

export const ControlBar = styled(Box)({
    bottom: "2rem",
    left: "0",
    background: "#01010199",
});

export const SliderContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    padding: "0 1.5rem",
});

export const ButtonsContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

export const ControlButtons = styled(Box)({
    display: "flex",
    justifyContent: "space-evenly",
    maxWidth: "10rem",
    mixBlendMode: "difference",
    filter: "invert(1)",
});