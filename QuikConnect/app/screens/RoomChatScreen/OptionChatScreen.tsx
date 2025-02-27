import React, { FC, useState } from "react"
import { View, TextField } from "react-native-ui-lib"
import { AppNavigationProps, AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import { Alert, Keyboard, Platform } from "react-native"
import { Screen } from "app/components"
import { Button } from "./components/Button"
import { moderateScale } from "app/theme/scalingUtils"

import * as images from "./components/images"
import { useNavigation } from "@react-navigation/native"
import { addRoom, getRoomById } from "app/services/firebase"
import uuid from "react-native-uuid"
import { useStores } from "app/models"

interface OptionChatScreenProps extends AppStackScreenProps<"OptionChat"> {}

export const OptionChatScreen: FC<OptionChatScreenProps> = observer(function OptionChatScreen() {
  const navigation: AppNavigationProps = useNavigation()
  const { userStore } = useStores()

  const [joinChat, setJoinChat] = useState(false)
  const [roomId, setRoomId] = useState("")

  const fetchRoomData = async (roomId: string) => {
    try {
      const roomData = await getRoomById({ roomId })
      if (roomData) {
        setJoinChat(false)
        setRoomId("")
        userStore.setEnterRoomId(roomData.roomId)
        navigation.navigate("RoomChat")
        Keyboard.dismiss()
      } else {
        Alert.alert("Invalid RoomId", "No exist Room Chat", [{ text: "Return" }])
        return
      }
    } catch (error) {
      console.error("Failed to fetch room data:", error)
    }
  }

  const joinChatRoom = () => {
    if (roomId.trim().length === 0) {
      Alert.alert("Invalid RoomId", "Please Enter RoomId", [{ text: "OK" }])
      return
    }
    fetchRoomData(roomId)
  }

  const renderJoinChat = () => {
    return (
      <View flex centerV>
        <View
          backgroundColor="white"
          paddingH-hs12
          paddingV-vs8
          marginH-hs16
          marginV-vs16
          br40
          height={moderateScale(42)}
        >
          <TextField
            placeholder={"Enter roomId"}
            onChangeText={setRoomId}
            maxLength={30}
            value={roomId}
          />
        </View>

        <View row marginH-hs16 centerH>
          <View flex marginR-hs16>
            <Button text={"Back"} onPress={() => setJoinChat(false)} leftIcon={images.backIcon} />
          </View>

          <View flex>
            <Button text={"Join"} onPress={joinChatRoom} rightIcon={images.nextIcon} />
          </View>
        </View>
      </View>
    )
  }

  const addRoomChat = async () => {
    let uuId = uuid.v4() as string
    const roomUuid = uuId.slice(0, 6)
    const newRoom = {
      roomId: roomUuid,
      numberMember: 0,
    }
    await addRoom(newRoom)
    userStore.setEnterRoomId(roomUuid)
    navigation.navigate("RoomChat")
  }

  const createChatRoom = async () => {
    if (joinChat === true) {
      Alert.alert("Invalid Action", "You are joining ChatRoom now !!!", [{ text: "Return" }])
      return
    }
    Alert.alert("Create Chat Room", "You are creating ChatRoom now !!!", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "CREATE", onPress: () => addRoomChat() },
    ])
  }

  return (
    <Screen
      preset="fixed"
      statusBarStyle="dark"
      StatusBarProps={{
        backgroundColor: `white`,
        hidden: false,
        translucent: false,
      }}
      safeAreaEdges={["top", "bottom"]}
      keyboardOffset={0}
      KeyboardAvoidingViewProps={{
        behavior: Platform.OS === "ios" ? "padding" : "height",
      }}
    >
      <View height={moderateScale(800)}>
        {!joinChat ? (
          <View flex centerV marginH-hs60>
            <Button text={"Join Chat"} onPress={() => setJoinChat(true)} />
          </View>
        ) : (
          renderJoinChat()
        )}

        <View flex marginH-hs60>
          <Button text={"Create Chat"} onPress={createChatRoom} />
        </View>
      </View>
    </Screen>
  )
})
