import React, { FC } from "react"
import { View, Text, TextField, Image } from "react-native-ui-lib"
import { observer } from "mobx-react-lite"
import { moderateScale } from "app/theme/scalingUtils"

import { Button } from "app/components/Button/Button"
import { useStores } from "app/models"
import { NextLogin } from "./NextLogin"
import { Alert, Keyboard, ViewStyle } from "react-native"
import { generateUsernameWithUUID } from "app/utils/QuikConnect/generateUsernameWithUUID"
import * as images from "./images"
import { colors } from "app/theme"

interface LoginProps {}

export const Login: FC<LoginProps> = observer(function Login(_props) {
  const { userStore } = useStores()
  const [userNameInput, setUserNameInput] = React.useState("")

  const updateUsername = () => {
    if (userNameInput.trim().length === 0) {
      Alert.alert("Invalid Username", "Please Enter Username", [{ text: "OK" }])
      return
    }
    let userName = generateUsernameWithUUID(userNameInput)
    userStore.setUserName(userName)
    Keyboard.dismiss()
  }

  const renderFirstLogin = () => {
    return (
      <View paddingV-vs20 marginT-hs30>
        <View center>
          <Text text70 orange10>Please Enter your USER NAME:</Text>
        </View>

        <View
          backgroundColor={colors.palette.neutral200}
          paddingH-hs12
          paddingV-vs8
          marginH-hs16
          marginV-vs16
          br40
          height={moderateScale(42)}
        >
          <TextField
            placeholder={"Username"}
            onChangeText={setUserNameInput}
            maxLength={30}
            value={userNameInput}
          />
        </View>

        <View marginH-hs16>
          <Button text={"Enter"} onPress={updateUsername} />
        </View>
      </View>
    )
  }

  const renderNextLogin = () => {
    return <NextLogin />
  }

  return (
    <>
      <View
        height={moderateScale(260)}
        center
        backgroundColor={colors.palette.accent100}
        marginH-hs20
        marginV-vs20
        br40
        style={$welcomeStyle}
      >
        <Image
          source={images.welcomeImage}
          height={moderateScale(180)}
          width={moderateScale(300)}
        />
        <Image source={images.toImage} height={moderateScale(20)} width={moderateScale(26)} />
        <View marginV-vs10>
          <Image
            source={images.quikconnectImage}
            height={moderateScale(40)}
            width={moderateScale(300)}
          />
        </View>
      </View>

      
      {userStore.userName.trim().length === 0 ? renderFirstLogin() : renderNextLogin()}
    </>
  )
})

const $welcomeStyle: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}
