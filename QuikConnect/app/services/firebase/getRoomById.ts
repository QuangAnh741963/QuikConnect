import { get, ref } from "firebase/database"
import { database } from "./firebaseConfig"
import { RoomDB } from "./type"

interface Props {
  roomId: string
}

const getRoomById = async ({ roomId }: Props) => {
  try {
    // Tạo tham chiếu đến đường dẫn của room cụ thể
    const roomRef = ref(database, `${RoomDB.URI}/${roomId}`)

    // Lấy dữ liệu từ Firebase
    const snapshot = await get(roomRef)

    if (snapshot.exists()) {
      return snapshot.val() // Trả về dữ liệu của room nếu tồn tại
    } else {
      return null
    }
  } catch (error) {
    console.error("Error reading room data: ", error)
    throw error
  }
}

export { getRoomById }
