import { ref, remove } from "firebase/database"
import { database } from "./firebaseConfig"
import { RoomDB } from "./type"

interface Props {
  roomId: string
}

const deleteRoom = ({ roomId }: Props) => {
  // Tạo tham chiếu đến đường dẫn của room cụ thể
  const roomRef = ref(database, `${RoomDB.URI}/${roomId}`)

  // Xóa room từ Firebase
  remove(roomRef)
    .then(() => {
      console.log("Room data deleted successfully!")
    })
    .catch((error) => {
      console.error("Error deleting room data: ", error)
    })
}

export { deleteRoom }
