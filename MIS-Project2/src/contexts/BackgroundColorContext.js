import { createContext } from "react";

export const backgroundColors = {
  primary: "green",
  blue: "green",
  green: "green",
};

export const BackgroundColorContext = createContext({
  color: backgroundColors.green,
  changeColor: (color) => {},
});
