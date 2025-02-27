import * as React from "react"
import { observer } from "mobx-react-lite"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { View } from "react-native-ui-lib"
import { Platform, ViewStyle } from "react-native"

export type SafeAreaViewProps = {
  edges: ExtendedEdge[]
}

export const SafeAreaView = observer(function (props: SafeAreaViewProps) {
  const { edges } = props
  const insets = useSafeAreaInsetsStyle(edges)

  return <View style={insets} />
})

export const SafeAreaViewTop = observer(function () {
  if (Platform.OS === "web") return <View style={$paddingTop} />
  return <SafeAreaView edges={["top"]} />
})

export const SafeAreaViewBottom = observer(function () {
  return <SafeAreaView edges={["bottom"]} />
})

const $paddingTop: ViewStyle = {
  paddingTop: 20,
}
