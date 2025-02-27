import { ref, set } from "firebase/database"
import { database } from "./firebaseConfig"
import { RoomDB } from "./type"

interface Props {
  roomId: string
  numberMember: number
}

const addRoom = ({ roomId, numberMember }: Props) => {
  const newRoom = {
    roomId: roomId,
    numberMember: numberMember,
  }

  const roomRef = ref(database, `${RoomDB.URI}/${roomId}`)

  set(roomRef, newRoom)
    .then(() => {})
    .catch((error) => {
      console.error("Error adding room data: ", error)
    })
}

export { addRoom }
