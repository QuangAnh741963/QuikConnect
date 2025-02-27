import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375
const guidelineBaseHeight = 812
const maxWidthLimit = 500 // using for web

export const screenWidth = Math.min(width, maxWidthLimit)
export const screenHeight = height

const [shortDimension, longDimension] =
  screenWidth < screenHeight ? [screenWidth, screenHeight] : [screenHeight, screenWidth]

export const horizontalScale = (size: number) => (shortDimension / guidelineBaseWidth) * size
export const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor
export const scale = horizontalScale
export const s = horizontalScale
export const hs = horizontalScale
export const vs = verticalScale
export const ms = moderateScale
export const mvs = moderateVerticalScale
