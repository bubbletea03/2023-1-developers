import { DefaultTheme } from "styled-components";
import { media } from "./lightTheme";

const darkTheme: DefaultTheme = {
  colors: {
    bg: "#6e6e6e",
    topBg: "#444444",
    mainPinterestContainer: "#7e888f",
    boardPinterestContainer: "#cfcd97",
    titleFont: "white",
    defaultFont: "#f2f2f2",
    themeBtn: "white",
    navbarHighlight: "#232323",
  },
  media,
};

export default darkTheme;
