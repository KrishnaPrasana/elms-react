import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // Admin blue
        },
        background: {
            default: "#f5f7fa",
            paper: "#ffffff",
        },
    },

    typography: {
        fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,

        // h4: {
        //     fontSize: "1.6rem",
        //     fontWeight: 600,
        // },
        // h5: {
        //     fontSize: "1.25rem",
        //     fontWeight: 500,
        // },
    },

    shape: {
        borderRadius: 5,
    },

    components: {
        /* ✅ Paper (cards) */
        MuiPaper: {
            defaultProps: {
                elevation: 1,
            },
            // styleOverrides: {
            //     root: {
            //         padding: "16px",
            //     },
            // },
        },

        /* ✅ TextField */
        MuiTextField: {
            defaultProps: {
                variant: "filled",
                margin: "normal",
                size: "medium",
            },
        },

        MuiSelect: {
            defaultProps: {
                variant: "filled",
                size: "medium",
                margin: "none",

            }
        },

        MuiFormControl: {
            defaultProps: {
                variant: "filled"
            }
        },

        /* ✅ Button */
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    // color: "black",
                    textTransform: "none",
                    borderRadius: 5,
                    padding: "8px 20px",
                },
            },
        },
    },
});

export default theme;
