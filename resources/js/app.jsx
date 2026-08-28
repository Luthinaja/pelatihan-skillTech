import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // Warna utama
            light: "#63a4ff", // Warna terang
            dark: "#004ba0", // Warna gelap
        },
        secondary: {
            main: "#311b92", // Warna sekunder
            light: "#4527a0", // Warna terang
        },
        background: {
            default: "#f5f5f5", // Warna latar belakang utama
            paper: "#ffffff", // Warna elemen berbasis kertas
        },
        text: {
            primary: "#000000", // Warna teks utama
            secondary: "#616161", // Warna teks sekunder
        },
    },
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
