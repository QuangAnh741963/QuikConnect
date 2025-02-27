// import React, { FC, useEffect, useState } from "react"
// import { View, Text } from "react-native-ui-lib"
// import { observer } from "mobx-react-lite"
// import { Button, Keyboard, Platform, TextInput } from "react-native"
// import { Screen } from "app/components"
// import { io, Socket } from "socket.io-client"
// import { useStores } from "app/models"

// interface ChatSocketIOProps {}

// export const ChatSocketIO: FC<ChatSocketIOProps> = observer(function ChatSocketIO(_props) {
//   const SocketIOClient = () => {
//     const [messages, setMessages] = useState<
//       { userName: string; message: string; isMyself: boolean }[]
//     >([]) // Sử dụng mảng để lưu trữ các tin nhắn
//     const [input, setInput] = useState("") // Biến lưu trữ tin nhắn nhập từ người dùng
//     const [socket, setSocket] = useState<Socket | null>(null) // Biến lưu trữ kết nối Socket.IO

//     const { userStore } = useStores()

//     useEffect(() => {
//       console.log(userStore.enterRoomId)

//       // Kết nối tới server Socket.IO
//       const newSocket = io("http://192.168.1.18:8080") // Địa chỉ IP của server Socket.IO
//       setSocket(newSocket)

//       newSocket.on("connect", () => {
//         console.log("Connected to Socket.IO server")
//       })

//       // Join Room
//       newSocket.emit("joinRoom", userStore.enterRoomId)

//       // Đăng ký lắng nghe sự kiện "message" ngay sau khi khởi tạo socket
//       newSocket.on("message", (data) => {
//         const { roomId, userName, message, isMyself } = data
//         console.log(`Message from ${userName} - ${isMyself} in room ${roomId}: ${message}`)
//         setMessages((prevMessages) => [...prevMessages, { userName, message, isMyself }]) // Lưu lại các tin nhắn đã nhận dưới dạng mảng đối tượng
//       })

//       newSocket.on("disconnect", () => {
//         console.log("Socket.IO connection closed")
//       })

//       return () => {
//         newSocket.disconnect()

//         console.log("Socket.IO connection closed on unmount")
//       }
//     }, [])

//     const sendMessage = () => {
//       if (socket && input.trim() !== "") {
//         // Gửi tin nhắn tới tất cả các client trong room chỉ định
//         socket.emit("message", {
//           roomId: userStore.enterRoomId,
//           userName: userStore.userName,
//           message: input,
//           isMyself: true,
//         })

//         setInput("") // Xóa nội dung input sau khi gửi
//         Keyboard.dismiss()
//       }
//     }

//     return (
//       <View marginT-vs24>
//         <Text>Socket.IO Chat Client</Text>
//         <View height={24}></View>

//         <View height={50}></View>
//         <Text>Messages from server:</Text>
//         {messages.map((msg, index) => (
//           <Text key={index}>
//             {msg.userName}: {msg.message}
//           </Text>
//         ))}

//         <TextInput
//           placeholder="Type your message..."
//           value={input}
//           onChangeText={setInput}
//           style={{
//             height: 40,
//             borderColor: "gray",
//             borderWidth: 1,
//             marginVertical: 10,
//             paddingHorizontal: 10,
//           }}
//         />
//         <Button title="Send Message" onPress={sendMessage} />
//       </View>
//     )
//   }

//   return (
//     <Screen
//       preset="fixed"
//       statusBarStyle="dark"
//       StatusBarProps={{
//         backgroundColor: `white`,
//         hidden: false,
//         translucent: false,
//       }}
//       safeAreaEdges={["top", "bottom"]}
//       keyboardOffset={20}
//       KeyboardAvoidingViewProps={{
//         behavior: Platform.OS === "ios" ? "padding" : "height",
//       }}
//     >
//       <View height={500} center>
//         <SocketIOClient />
//       </View>
//     </Screen>
//   )
// })
