import { colors } from "app/theme"
import { moderateScale } from "app/theme/scalingUtils"
import React from "react"
import { ImageSourcePropType, TextStyle, ViewStyle } from "react-native"
import { TouchableOpacity, View, Text, Image } from "react-native-ui-lib"

interface ButtonProps {
  text: string
  onPress?: () => void
  leftIcon?: ImageSourcePropType
  rightIcon?: ImageSourcePropType
}

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        center
        backgroundColor={colors.palette.button}
        paddingH-hs12
        paddingV-vs8
        br40
        style={$buttonStyle}
        row
      >
        {props.leftIcon && (
          <View marginR-hs8>
            <Image source={props.leftIcon} height={moderateScale(18)} width={moderateScale(18)} />
          </View>
        )}
        <Text white text70 style={$textButtonStyle}>
          {props.text}
        </Text>
        {props.rightIcon && (
          <View marginL-hs8>
            <Image source={props.rightIcon} height={moderateScale(18)} width={moderateScale(18)} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const $buttonStyle: ViewStyle = {
  borderWidth: 4,
  borderColor: colors.palette.neutral100,
}

const $textButtonStyle: TextStyle = {
  fontWeight: `bold`,
}
