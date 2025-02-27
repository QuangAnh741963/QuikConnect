import React, { FC } from "react"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen } from "app/components"
import { colors } from "app/theme"
import { SocketIOClient } from "./components/SocketIOClient"
import { SafeAreaViewBottom } from "app/components/SafeAreaView"

interface RoomChatScreenProps extends AppStackScreenProps<"RoomChat"> {}

export const RoomChatScreen: FC<RoomChatScreenProps> = observer(function RoomChatScreen(_props) {
  return (
    <Screen
      style={$root}
      preset="fixed"
      statusBarStyle="dark"
      StatusBarProps={{
        backgroundColor: `white`,
        hidden: false,
        translucent: false,
      }}
      keyboardOffset={50}
      backgroundColor={colors.palette.neutral100}
    >
      <SocketIOClient />
      <SafeAreaViewBottom />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
