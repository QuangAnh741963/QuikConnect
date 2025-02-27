import { useNavigation } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { View, Text, TouchableOpacity, Image } from "react-native-ui-lib"
import { AppNavigationProps } from "../AppNavigator"

import * as images from "./images"
import { moderateScale } from "app/theme/scalingUtils"
import { colors } from "app/theme"
import { useStores } from "app/models"
import { SafeAreaViewTop } from "app/components/SafeAreaView"

const RoomChatHeader = () => {
  const navigation: AppNavigationProps = useNavigation()
  const { userStore } = useStores()

  return (
    <View style={$containerStyle} paddingH-hs15 paddingV-vs10>
      <SafeAreaViewTop />
      <View row centerV spread>
        <View row center>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View marginR-hs12>
              <Image
                source={images.backIcon}
                height={moderateScale(18)}
                width={moderateScale(18)}
              />
            </View>
          </TouchableOpacity>

          <Text style={$headerTitle}>Room Chat Online: {userStore.enterRoomId}</Text>
        </View>

        <View>
          <Text>VIDEO CALL</Text>
        </View>
      </View>
    </View>
  )
}

const $headerTitle: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: colors.palette.primary500,
}

const $containerStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}

export default RoomChatHeader
