export function extractUsername(fullString: string) {
  // Tách chuỗi dựa trên dấu '-'
  const parts = fullString.split("-")

  // Trả về phần đầu tiên của mảng, chính là "Username"
  return parts[0]
}
