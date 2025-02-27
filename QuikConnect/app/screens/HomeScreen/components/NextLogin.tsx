import React, { FC } from "react"
import { View, Text, TextField } from "react-native-ui-lib"
import { observer } from "mobx-react-lite"
import { moderateScale } from "app/theme/scalingUtils"

import { TIME_OF_DAY } from "./types"
import { useStores } from "app/models"
import { Button } from "app/components/Button/Button"
import { Alert, Keyboard, ViewStyle } from "react-native"
import { generateUsernameWithUUID } from "app/utils/QuikConnect/generateUsernameWithUUID"
import { extractUsername } from "app/utils/QuikConnect/extractUsername"
import { colors } from "app/theme"

interface NextLoginProps {}

export const NextLogin: FC<NextLoginProps> = observer(function NextLogin(_props) {
  const { userStore } = useStores()
  const [userNameInput, setUserNameInput] = React.useState(extractUsername(userStore.userName))
  const [timeOfDay, setTimeOfDay] = React.useState("")
  const [showUpdateUsername, setshowUpdateUsername] = React.useState(false)

  const returnTimeOfDay = () => {
    const now = new Date()
    const hour = now.getHours()

    if (hour >= 6 && hour < 12) {
      setTimeOfDay(TIME_OF_DAY.MORNING)
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay(TIME_OF_DAY.AFTERNOON)
    } else if (hour >= 18 && hour < 21) {
      setTimeOfDay(TIME_OF_DAY.EVENING)
    } else {
      setTimeOfDay(TIME_OF_DAY.NIGHT)
    }
  }

  React.useEffect(() => {
    returnTimeOfDay()
  }, [])

  const updateUsername = () => {
    if (userNameInput.trim().length === 0) {
      Alert.alert("Invalid Username", "Please Enter Username", [{ text: "OK" }])
      return
    }
    let userName = generateUsernameWithUUID(userNameInput)
    userStore.setUserName(userName)
    setshowUpdateUsername(false)
    Keyboard.dismiss()
  }

  const renderUpdateUserName = () => {
    return (
      <View>
        <View center>
          <Text text70 orange10>
            Please Enter your USER NAME:
          </Text>
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

  return (
    <>
      <View
        center
        marginV-vs40
        backgroundColor={colors.palette.primary100}
        paddingV-vs12
        style={$welcomeStyle}
      >
        <Text text60 orange20>
          Good {timeOfDay} {extractUsername(userStore.userName)}
        </Text>
      </View>

      {!showUpdateUsername && (
        <View marginH-hs16>
          <Button text={"Update User Name"} onPress={() => setshowUpdateUsername(true)} />
        </View>
      )}

      {showUpdateUsername && renderUpdateUserName()}
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
