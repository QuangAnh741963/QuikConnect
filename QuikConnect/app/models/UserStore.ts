import { types } from "mobx-state-tree"

const props = {
  userName: types.optional(types.string, ""),
  enterRoomId: types.optional(types.string, ""),
}

const UserStoreModel = types
  .model("UserStoreModel", props)
  .views((self) => ({
    get userInfo() {
      return {
        userName: self.userName,
        enterRoomId: self.enterRoomId,
      }
    },
  }))
  .actions((self) => ({
    setUserName(userName: string) {
      self.userName = userName
    },

    setEnterRoomId(enterRoomId: string) {
      self.enterRoomId = enterRoomId
    },

    resetUserInfo() {
      self.userName = ""
      self.enterRoomId = ""
    },
  }))

export { UserStoreModel }
