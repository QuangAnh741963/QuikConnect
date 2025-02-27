import uuid from "react-native-uuid"

export function generateUsernameWithUUID(username: string) {
  // Tạo một UUID mới
  let uuId = uuid.v4() as string

  // Lấy 6 ký tự đầu tiên của UUID
  const tail = uuId.slice(0, 6)

  // Kết hợp username và tail
  return `${username}-${tail}`
}
