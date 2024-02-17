import { Box, styled } from "@mui/material";

export const Container = styled(Box)({
    display: "flex",
    flex: "0.2",
    background: "#f48b00",
    height: "100vh",
    flexDirection: "column",
});

export const ContainerBreakPoints = {
    flex: {
        lg: "0.2",
        md: "0.2",
        sm: "0",
        xs: "0",
    },
    flexDirection: {
        lg: "column",
        md: "column",
        sm: "row",
        xs: " row",
    },
};

export const OptionsContainer = styled(Box)({
    width: "100%",
    cursor: "pointer",
    transition: "all 250ms ease",
    color: "#f4f4f4",
});

export const TextOptionBreakPoints = {
    display: {
        lg: "block",
        md: "block",
        sm: "none",
        xs: "none"
    }
};

export const IconOptionBreakPoints = {
    display: {
        lg: "none",
        md: "none",
        sm: "block",
        xs: "block"
    },
    "&:hover": {
        background: "#c57200",
        borderRadius: "7px"
    }
};

export const OptionsContainerBreakPoints = {
    margin: {
        lg: "2rem",
        md: "2rem",
        sm: "10px",
        xs: "10px",
    },
    fontSize: {
        lg: "27px",
        md: "27px",
        sm: "22px",
        xs: "20px",
    },
    textAlign: {
        lg: "left",
        md: "left",
        sm: "center",
        xs: "center",
    },
    "&:hover": {
        lg: {
            fontSize: "36px",
            color: "#fff",
        },
        md: {
            fontSize: "36px",
            color: "#fff",
        },
        sm: {},
        xs: {}
    },
};