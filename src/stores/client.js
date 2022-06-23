import { defineStore } from "pinia";
export const useClientStore = defineStore({
  id: "client",
  state: () => ({
    client: {},
    roomList: [],
  }),
  actions: {
    setClient(value) {
      this.client = value;
    },
    setRoomList(value) {
      this.roomList = value;
    },
  },
});
