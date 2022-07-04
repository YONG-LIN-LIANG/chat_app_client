import { defineStore } from "pinia";
import { reactive } from "vue";
export const useCsStore = defineStore(
  "cs",
  () => {
    const cs = reactive({});

    return { cs };
  }
  // state: () => ({
  //   cs: {},
  //   roomList: [],
  // }),
  // actions: {
  // setCs(value) {
  //   this.cs = value;
  // },
  //   setRoomList(value) {
  //     this.roomList = value;
  //   },
  // },
);
