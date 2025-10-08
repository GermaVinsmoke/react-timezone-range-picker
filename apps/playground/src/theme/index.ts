import { createTheme } from "@mantine/core";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/geist/400.css";
import "@fontsource/geist/600.css";
import { appTheme } from "./token";

export const theme = createTheme({
  //   primaryColor: "teal",
  //   fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
  fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
  headings: {
    // fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
    fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
  },

  other: {
    appTheme,
  },
});
