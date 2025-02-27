import { Platform } from "react-native"
import { Spacings, Typography } from "react-native-ui-lib"

import { horizontalScale, moderateScale, verticalScale } from "./scalingUtils"

const loadTypographies = {
  h1: { fontSize: moderateScale(36), fontWeight: "600" },
  h2: { fontSize: moderateScale(32), fontWeight: "600" },
  h3: { fontSize: moderateScale(26), fontWeight: "600" },
  fs10: { fontSize: moderateScale(10) },
  fs11: { fontSize: moderateScale(11) },
  fs12: { fontSize: moderateScale(12) },
  fs13: { fontSize: moderateScale(13) },
  fs14: { fontSize: moderateScale(14) },
  fs15: { fontSize: moderateScale(15) },
  fs16: { fontSize: moderateScale(16) },
  fs17: { fontSize: moderateScale(17) },
  fs18: { fontSize: moderateScale(18) },
  fs20: { fontSize: moderateScale(20) },
  fs24: { fontSize: moderateScale(24) },
  fs26: { fontSize: moderateScale(26) },
  fs30: { fontSize: moderateScale(30) },
  fs32: { fontSize: moderateScale(32) },
  fs36: { fontSize: moderateScale(36) },
  fs40: { fontSize: moderateScale(40) },
  fs42: { fontSize: moderateScale(42) },
  fs48: { fontSize: moderateScale(48) },
  fs50: { fontSize: moderateScale(50) },
  fs60: { fontSize: moderateScale(60) },
  fs64: { fontSize: moderateScale(64) },
  fs70: { fontSize: moderateScale(70) },
  fs72: { fontSize: moderateScale(72) },
  fs80: { fontSize: moderateScale(80) },
  fs90: { fontSize: moderateScale(90) },
  fs96: { fontSize: moderateScale(96) },
  rounded0: { borderRadius: moderateScale(0) },
  rounded4: { borderRadius: moderateScale(4) },
  rounded8: { borderRadius: moderateScale(8) },
  rounded12: { borderRadius: moderateScale(12) },
  rounded16: { borderRadius: moderateScale(16) },
  rounded100: { borderRadius: "100%" },
  fw900: {
    fontWeight: Platform.select({
      ios: "900",
      android: "900",
    }),
  },
  fwBlack: {
    fontWeight: Platform.select({
      ios: "900",
      android: "900",
    }),
  },
  fw800: {
    fontWeight: Platform.select({
      ios: "800",
      android: "800",
    }),
  },
  fwHeavy: {
    fontWeight: Platform.select({
      ios: "800",
      android: "800",
    }),
  },
  fw700: {
    fontWeight: Platform.select({
      ios: "700",
      android: "bold",
    }),
  },
  fwBold: {
    fontWeight: Platform.select({
      ios: "700",
      android: "bold",
    }),
  },
  fw600: {
    fontWeight: Platform.select({
      ios: "600",
      android: "bold",
    }),
  },
  fwSemibold: {
    fontWeight: Platform.select({
      ios: "600",
      android: "bold",
    }),
  },
  fw500: {
    fontWeight: Platform.select({
      ios: "500",
      android: "500",
    }),
  },
  fwMedium: {
    fontWeight: Platform.select({
      ios: "500",
      android: "500",
    }),
  },
  fw400: {
    fontWeight: Platform.select({
      ios: "400",
      android: "400",
    }),
  },
  fwNormal: {
    fontWeight: Platform.select({
      ios: "400",
      android: "400",
    }),
  },
  fw300: {
    fontWeight: Platform.select({
      ios: "300",
      android: "300",
    }),
  },
  fwLight: {
    fontWeight: Platform.select({
      ios: "300",
      android: "300",
    }),
  },
  heading: { fontSize: moderateScale(36), fontWeight: "600" },
  subheading: { fontSize: moderateScale(28), fontWeight: "500" },
  body: { fontSize: moderateScale(18), fontWeight: "400" },
}

const generateSpace = (options: {
  key: string
  max?: number
  size?: number
  scale?: (number: number) => number
}) => {
  const result: Record<string, number> = {}
  const { key, max = 10, size = 1, scale } = options
  for (let index = 1; index <= max; index++) {
    const space = size || 4
    const value = space * index
    result[`${key}${index}`] = scale ? scale(value) : value
  }
  return result
}

const loadSpacings = {
  ...generateSpace({ key: "s", max: 10, size: 4, scale: horizontalScale }),
  ...generateSpace({ key: "sv", max: 10, size: 4, scale: verticalScale }),
  ...generateSpace({ key: "hs", max: 1000, size: 1, scale: horizontalScale }),
  ...generateSpace({ key: "vs", max: 1000, size: 1, scale: verticalScale }),
}

export const initTheme = () => {
  Typography.loadTypographies(loadTypographies)
  Spacings.loadSpacings(loadSpacings)
}
