import { ThemeOptions, createTheme, Theme } from "@mui/material";
import variables from '../variables.module.scss';

export enum ThemeMode {
  light = 'light',
  dark = 'dark'
}

const getThemeOptions = (mode: ThemeMode = ThemeMode.dark): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: `${variables['primaryColor']}`,
    },
    secondary: {
      main: `${variables['secondaryColor']}`,
    },
    info: {
      main: `${variables['infoColor']}`,
    },
    divider: `${variables['dividerColor']}`,
  },
});

const getTheme = (mode: ThemeMode = ThemeMode.dark): Theme => {
  return createTheme(getThemeOptions(mode));
}
export const darkTheme = getTheme(ThemeMode.dark);
export const lightTheme = getTheme(ThemeMode.light);