import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const FONTS = {
    largeTitle: { fontFamily: "Cairo", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "Cairo", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Cairo", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Cairo", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Cairo", fontSize: SIZES.h4, lineHeight: 22 },
    body1: {
      fontFamily: "Cairo",
      fontSize: SIZES.body1,
      lineHeight: 36,
    },
    body2: {
      fontFamily: "Cairo",
      fontSize: SIZES.body2,
      lineHeight: 30,
    },
    body3: {
      fontFamily: "Cairo",
      fontSize: SIZES.body3,
      lineHeight: 22,
    },
    body4: {
      fontFamily: "Cairo",
      fontSize: SIZES.body4,
      lineHeight: 22,
    },
    body5: {
      fontFamily: "Cairo",
      fontSize: SIZES.body5,
      lineHeight: 22,
    },
  };
  
  const FONTS = { FONTS };
  
  export default FONTS