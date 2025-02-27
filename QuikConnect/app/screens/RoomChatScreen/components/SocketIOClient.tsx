import React, { FC, useEffect, useState } from "react"
import { View, Text, TextField, TouchableOpacity, Image } from "react-native-ui-lib"
import { observer } from "mobx-react-lite"
import { Keyboard, ViewStyle } from "react-native"
import { io, Socket } from "socket.io-client"
import { useStores } from "app/models"
import { moderateScale } from "app/theme/scalingUtils"
import { ipURL } from "app/services/firebase/type"
import { ScrollView } from "react-native-gesture-handler"
import { colors } from "app/theme"
import * as images from "./images"

interface MessageContent {
  userName: string
  message: string
  isMyself: boolean
}

interface SocketIOClientProps {}

export const SocketIOClient: FC<SocketIOClientProps> = observer(function SocketIOClient(_props) {
  const [messages, setMessages] = useState<MessageContent[]>([]) // Sử dụng mảng để lưu trữ các tin nhắn
  const [input, setInput] = useState("") // Biến lưu trữ tin nhắn nhập từ người dùng
  const [socket, setSocket] = useState<Socket | null>(null) // Biến lưu trữ kết nối Socket.IO

  const { userStore } = useStores()

  useEffect(() => {
    console.log(userStore.enterRoomId)

    // Kết nối tới server Socket.IO
    const newSocket = io(ipURL) // Địa chỉ IP của server Socket.IO
    setSocket(newSocket)

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server")
    })

    // Join Room
    newSocket.emit("joinRoom", userStore.enterRoomId)

    // Đăng ký lắng nghe sự kiện "message" ngay sau khi khởi tạo socket
    newSocket.on("message", (data) => {
      const { userName, message, isMyself } = data
      if (userName === userStore.userName) {
        addMyMessage(userName, message)
        console.log(`ismyself` + isMyself)
      } else {
        addYourMessage(userName, message)
        console.log(`nomyself` + isMyself)
      }
    })

    newSocket.on("disconnect", () => {
      console.log("Socket.IO connection closed")
    })

    return () => {
      newSocket.disconnect()

      console.log("Socket.IO connection closed on unmount")
    }
  }, [])

  const sendMessage = () => {
    if (socket && input.trim() !== "") {
      // Gửi tin nhắn tới tất cả các client trong room chỉ định
      socket.emit("message", {
        roomId: userStore.enterRoomId,
        userName: userStore.userName,
        message: input,
        isMyself: true,
      })

      setInput("") // Xóa nội dung input sau khi gửi
      Keyboard.dismiss()
    }
  }

  const addMyMessage = (userName: string, message: string) => {
    let isMyself = true
    setMessages((prevMessages) => [...prevMessages, { userName, message, isMyself }])
  }

  const addYourMessage = (userName: string, message: string) => {
    let isMyself = false
    setMessages((prevMessages) => [...prevMessages, { userName, message, isMyself }])
  }

  const renderTextField = () => {
    return (
      <View row spread center backgroundColor={colors.palette.neutral100} marginT-vs10 marginB-vs30>
        <View
          backgroundColor={colors.palette.neutral200}
          paddingH-hs12
          paddingV-vs8
          marginH-hs16
          br40
          height={moderateScale(42)}
          flex
        >
          <TextField placeholder={"Type your message..."} onChangeText={setInput} value={input} />
        </View>

        <TouchableOpacity onPress={sendMessage}>
          <View
            center
            backgroundColor={colors.palette.button}
            paddingH-hs12
            paddingV-vs8
            br40
            style={$buttonStyle}
            row
            marginR-hs16
          >
            <View>
              <Image
                source={images.nextIcon}
                height={moderateScale(18)}
                width={moderateScale(18)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const renderRightMessage = (msg: MessageContent, index: number) => {
    return (
      <View key={index} row marginT-vs12>
        <View flex-1 paddingH-hs4 paddingV-vs4>
          <View center marginB-vs4>
            <Image
              source={images.defaultAvatar}
              height={moderateScale(42)}
              width={moderateScale(42)}
            />
          </View>
          <View centerV>
            <Text>{msg.userName}</Text>
          </View>
        </View>
        <View flex-4 backgroundColor="#ddffe1" paddingH-hs10 paddingV-vs10 br40>
          <Text>{msg.message}</Text>
        </View>
      </View>
    )
  }

  const renderLeftMessage = (msg: MessageContent, index: number) => {
    return (
      <View key={index} row marginT-vs12 style={$reverseLayout}>
        <View flex-1 paddingH-hs4 paddingV-vs4>
          <View center marginB-vs4>
            <Image
              source={images.defaultAvatar}
              height={moderateScale(42)}
              width={moderateScale(42)}
            />
          </View>
          <View centerV>
            <Text>{msg.userName}</Text>
          </View>
        </View>
        <View flex-4 paddingH-hs10 paddingV-vs10 br40 style={$boxChat}>
          <Text>{msg.message}</Text>
        </View>
      </View>
    )
  }

  return (
    <>
      <View flex paddingH-hs12 backgroundColor="#fffadd">
        <ScrollView>
          {messages.map((msg, index) => {
            return msg.isMyself ? renderLeftMessage(msg, index) : renderRightMessage(msg, index)
          })}
        </ScrollView>
      </View>
      {renderTextField()}
    </>
  )
})

const $buttonStyle: ViewStyle = {
  borderWidth: 4,
  borderColor: colors.palette.secondary200,
}

const $reverseLayout: ViewStyle = {
  flexDirection: "row-reverse",
}

const $boxChat: ViewStyle = {
  backgroundColor: "#ddffe1",
  borderWidth: 2,
  borderColor: `#feb7b7`,
}
