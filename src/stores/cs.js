import { defineStore } from "pinia";
export const useCsStore = defineStore({
  id: "cs",
  state: () => ({
    cs: {},
    roomList: [],
  }),
  actions: {
    setCs(value) {
      this.cs = value;
    },
    setRoomList(value) {
      this.roomList = value;
    },
  },
});
