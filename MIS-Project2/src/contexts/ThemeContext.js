import { createContext } from "react";

export const themes = {
  dark: "",
  light: "",
};

export const ThemeContext = createContext({
  theme: themes.light,
  changeTheme: () => {},
});
