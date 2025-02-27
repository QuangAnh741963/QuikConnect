import React, { FC } from "react"
import { View } from "react-native-ui-lib"
import { AppNavigationProps, AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import { Alert, Platform } from "react-native"
import { Screen } from "app/components"
import { ScrollView } from "react-native-gesture-handler"
import { Login } from "./components/Login"

import { Button } from "app/components/Button/Button"
import { moderateScale } from "app/theme/scalingUtils"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import * as images from "./components/images"
import { colors } from "app/theme"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { userStore } = useStores()
  const navigation: AppNavigationProps = useNavigation()

  const continued = () => {
    if (userStore.userName.trim().length === 0) {
      Alert.alert("Invalid Username", "Please Enter Username", [{ text: "OK" }])
      return
    }
    navigation.navigate("OptionChat")
  }

  return (
    <Screen
      preset="auto"
      statusBarStyle="dark"
      StatusBarProps={{
        backgroundColor: `white`,
        hidden: false,
        translucent: false,
      }}
      safeAreaEdges={["top", "bottom"]}
      keyboardOffset={30}
      KeyboardAvoidingViewProps={{
        behavior: Platform.OS === "ios" ? "padding" : "height",
      }}
      backgroundColor={colors.palette.neutral100}
    >
      <View backgroundColor={colors.palette.neutral100} >
        <View height={moderateScale(650)}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Login />
          </ScrollView>
        </View>
        <View marginT-vs24 marginH-hs16>
          <Button text={"Continue"} onPress={continued} rightIcon={images.continuedIcon} />
        </View>
      </View>
    </Screen>
  )
})
