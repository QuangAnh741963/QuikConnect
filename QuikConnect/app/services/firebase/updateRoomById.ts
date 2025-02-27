import { ref, update } from "firebase/database"
import { database } from "./firebaseConfig"
import { RoomDB } from "./type"

interface UpdateRoomProps {
  roomId: string
  numberMember: number
}

const updateRoomById = async ({ roomId, numberMember }: UpdateRoomProps) => {
  try {
    // Tạo tham chiếu đến đường dẫn của room cụ thể
    const roomRef = ref(database, `${RoomDB.URI}/${roomId}`)

    // Cập nhật số lượng thành viên
    await update(roomRef, { numberMember: numberMember })

    console.log("Room data updated successfully!")
  } catch (error) {
    console.error("Error updating room data: ", error)
    throw error
  }
}

export { updateRoomById }
