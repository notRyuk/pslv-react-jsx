import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";
import palette from "./palette";


export default function ThemeProvider({ children }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#1976d2',
                light: '#fff',
                dark: palette.colors.primary,
                contrastText: palette.colors.primaryText
            },
            secondary: {
                main: '#fff',
                contrastText: palette.colors.primaryText
            },
            background: {
                default: palette.colors.bgPrimary,
                paper: palette.colors.bgSecondary
            },
            text: {
                primary: palette.colors.primaryText,
                secondary: palette.colors.primaryText
            }
        },

    });
    return (
        <>
            <MuiThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </MuiThemeProvider>
        </>
    );
}