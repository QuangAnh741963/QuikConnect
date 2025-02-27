import React, { FC, useEffect, useState } from "react"
import { View, Text } from "react-native-ui-lib"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import { Button, Keyboard, Platform, TextInput } from "react-native"
import { Screen } from "app/components"
import { io, Socket } from "socket.io-client"
import { addRoom, deleteRoom, getRoomById, updateRoomById } from "app/services/firebase"
import { useStores } from "app/models"

interface StartScreenProps extends AppStackScreenProps<"Start"> {}

export const StartScreen: FC<StartScreenProps> = observer(function StartScreen(_props) {
  const SocketIOClient = () => {
    const [messages, setMessages] = useState<
      { userName: string; message: string; isMyself: boolean }[]
    >([]) // Sử dụng mảng để lưu trữ các tin nhắn
    const [input, setInput] = useState("") // Biến lưu trữ tin nhắn nhập từ người dùng
    const [socket, setSocket] = useState<Socket | null>(null) // Biến lưu trữ kết nối Socket.IO
    const [roomId, setRoomId] = useState("") // Biến trạng thái để lưu trữ tên phòng
    const [yourName, setYourName] = useState("")

    useEffect(() => {
      // Kết nối tới server Socket.IO
      const newSocket = io("http://192.168.1.18:8080") // Địa chỉ IP của server Socket.IO
      setSocket(newSocket)

      newSocket.on("connect", () => {
        console.log("Connected to Socket.IO server")
      })

      // Đăng ký lắng nghe sự kiện "message" ngay sau khi khởi tạo socket
      newSocket.on("message", (data) => {
        const { roomId, userName, message, isMyself } = data
        console.log(`Message from ${userName} - ${isMyself} in room ${roomId}: ${message}`)
        setMessages((prevMessages) => [...prevMessages, { userName, message, isMyself }]) // Lưu lại các tin nhắn đã nhận dưới dạng mảng đối tượng
      })

      newSocket.on("disconnectServer", () => {
        console.log("Socket.IO connection surprise closed")
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
          roomId: roomId,
          userName: yourName,
          message: input,
          isMyself: true,
        })

        setInput("") // Xóa nội dung input sau khi gửi
        Keyboard.dismiss()
      }
    }

    const joinRoom = () => {
      socket?.emit("joinRoom", roomId)
      Keyboard.dismiss()
    }

    return (
      <View marginT-vs24>
        <Text>Socket.IO Chat Client</Text>
        <View height={24}></View>

        <Text>Enter room chat</Text>
        <TextInput
          placeholder="Enter room name..."
          value={roomId}
          onChangeText={setRoomId}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingHorizontal: 10,
          }}
        />
        <Button title="Join Room" onPress={joinRoom} />

        <Text>Enter User Name</Text>
        <TextInput
          placeholder="Enter room name..."
          value={yourName}
          onChangeText={setYourName}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingHorizontal: 10,
          }}
        />

        <View height={50}></View>
        <Text>Messages from server:</Text>
        {messages.map((msg, index) => (
          <Text key={index}>
            {msg.userName}: {msg.message}
          </Text> // Hiển thị tên người dùng và tin nhắn
        ))}

        <TextInput
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginVertical: 10,
            paddingHorizontal: 10,
          }}
        />
        <Button title="Send Message" onPress={sendMessage} />
      </View>
    )
  }

  const [mount, setMount] = useState(false)

  const onPress = () => {
    setMount(!mount)
  }

  const addRoomChat = async () => {
    const newRoom = {
      roomId: `room2`,
      numberMember: 1,
    }
    await addRoom(newRoom)
  }

  const fetchRoomData = async () => {
    const roomId = "room2"
    try {
      const roomData = await getRoomById({ roomId })
      if (roomData) {
        console.log("Room Data:", roomData)
      }
    } catch (error) {
      console.error("Failed to fetch room data:", error)
    }
  }

  const updateRoomData = async () => {
    const roomId = "room1"
    const newNumberMember = 5

    try {
      await updateRoomById({ roomId, numberMember: newNumberMember })
      console.log("Room updated successfully")
    } catch (error) {
      console.error("Failed to update room:", error)
    }
  }

  const deleteRoomData = async () => {
    const roomId = "room1"
    try {
      await deleteRoom({ roomId })
      console.log("Room updated successfully")
    } catch (error) {
      console.error("Failed to delete room:", error)
    }
  }

  const { userStore } = useStores()

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
      keyboardOffset={20}
      KeyboardAvoidingViewProps={{
        behavior: Platform.OS === "ios" ? "padding" : "height",
      }}
    >
      <View height={500} center>
        <Text>Hello ReactNative!!!</Text>

        <Button title={mount ? "Un mount chat" : "Mount Chat"} onPress={addRoomChat} />
        {mount && <SocketIOClient />}
      </View>
    </Screen>
  )
})
