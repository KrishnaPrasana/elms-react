import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationContext = createContext();

export const useNotify = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [state, setState] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const notify = (message, severity = "success") => {
        setState({ open: true, message, severity });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}

            <Snackbar
                open={state.open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={state.severity}
                    variant="filled"
                >
                    {state.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};