import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { EpisodeStoreModel } from "./EpisodeStore"
import { UserStoreModel } from "./UserStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  episodeStore: types.optional(EpisodeStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
