import colors from "./colors";
import fonts from "./fonts";
import { spacing, radius } from "./spacing";

export const buildTheme = (opco = "default", mode = "light") => {
  return {
    colors: colors[opco][mode],
    fontSizes: fonts,
    spacing,
    radius,
  };
};
