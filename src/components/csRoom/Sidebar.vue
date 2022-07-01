<script setup>
import CSLogo from "@/components/svg/Logo.vue";
import StarIcon from "@/components/svg/Star.vue";
import Hamburger from "@/components/svg/Hamburger.vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { ref, onMounted, reactive, computed } from "vue";

const hamOpen = ref(false);
const menu = reactive({
  active: null,
  list: [
    {
      id: 0,
      name: "訊息",
      router: "/CsRoom/msg",
    },
    {
      id: 1,
      name: "排行榜",
      router: "/CsRoom/ranking",
    },
    {
      id: 2,
      name: "登出",
      router: "/Login",
    },
  ],
});
const route = useRoute();
const routePath = computed(() => route.path);
onMounted(() => {
  if (routePath.value === "/CsRoom/msg") {
    menu.active = 0;
  } else if (routePath.value === "/CsRoom/ranking") {
    menu.active = 1;
  } else if (routePath.value === "/Login") {
    menu.active = 2;
  } else if (routePath.value === "/CsRoom/score") {
    menu.active = 3;
  }
});
onBeforeRouteUpdate((to) => {
  if (to.path === "/CsRoom/msg") {
    menu.active = 0;
  } else if (to.path === "/CsRoom/ranking") {
    menu.active = 1;
  } else if (to.path === "/Login") {
    menu.active = 2;
  } else if (to.path === "/CsRoom/score") {
    menu.active = 3;
  }
});

// vue3--------------------------------------------------------

// watch(
//   () => route.path,
//   (to) => {
//     console.log("to", to, route.path);
//     if (to.path === "/CsRoom/msg") {
//       menu.active = 0;
//     } else if (to.path === "/CsRoom/ranking") {
//       menu.active = 1;
//     } else if (to.path === "/Login") {
//       menu.active = 2;
//     } else if (to.path === "/CsRoom/score") {
//       menu.active = 3;
//     }
//   }
// );

// vue2--------------------------------------------------------
// watch: {
//     $route(to, from) {
//       console.log("to", to.path);
//       if (to.path === "/CsRoom/msg") {
//         this.menu.active = 0;
//       }
//       else if(to.path === "/CsRoom/Ranking") {
//         this.menu.active = 1;
//       }
//       else if(to.path === "/Login") {
//         this.menu.active = 2;
//       }
//       else if(to.path === "/CsRoom/score") {
//         this.menu.active = 3;
//       }
//     },
//   },

// const test = () => {
//   if (window.location.href.indexOf("/CsRoom/msg") > -1) {
//     menu.active = 0;
//   } else if (window.location.href.indexOf("/CsRoom/ranking") > -1) {
//     menu.active = 1;
//   } else if (window.location.href.indexOf("/Login") > -1) {
//     menu.active = 2;
//   } else if (window.location.href.indexOf("/CsRoom/score") > -1) {
//     menu.active = 3;
//   }
// };
// test();

// export default {
//   components: {
//     CSLogo,
//     StarIcon,
//     Hamburger,
//   },

//   setup() {
//     const menu = reactive({
//       active: 0,
//       list: [
//         {
//           id: 0,
//           name: "訊息",
//           router: "/CsRoom/msg",
//         },
//         {
//           id: 1,
//           name: "排行榜",
//           router: "/CsRoom/ranking",
//         },
//         {
//           id: 2,
//           name: "登出",
//           router: "/Login",
//         },
//       ],
//     });
//     const test = () => {
//       if (window.location.href.indexOf("/CsRoom/msg") > -1) {
//         menu.active = 0;
//       } else if (window.location.href.indexOf("/CsRoom/ranking") > -1) {
//         menu.active = 1;
//       } else if (window.location.href.indexOf("/Login") > -1) {
//         menu.active = 2;
//       } else if (window.location.href.indexOf("/CsRoom/score") > -1) {
//         menu.active = 3;
//       }
//     };
//     test();
//     return { menu };
//   },
//   watch: {
//     $route(to, from) {
//       console.log("to", to.path);
//       if (to.path === "/CsRoom/msg") {
//         this.menu.active = 0;
//       }
//       else if(to.path === "/CsRoom/Ranking") {
//         this.menu.active = 1;
//       }
//       else if(to.path === "/Login") {
//         this.menu.active = 2;
//       }
//       else if(to.path === "/CsRoom/score") {
//         this.menu.active = 3;
//       }
//     },
//   },
// };

// });
</script>

<template>
  <!-- desktop -->
  <div
    class="sidebar_section"
    :class="['sidebar_section', hamOpen ? '' : 'sm:hidden']"
  >
    <div
      class="
        sidebar_info
        box-border
        px-8
        lg:px-3.5
        py-6
        border-b border-solid border-white
        sm:hidden
        xxs:block
      "
    >
      <div class="flex items-center justify-between xxs:hidden">
        <div class="sidebar_logo w-9 flex">
          <CSLogo />
        </div>
        <div
          class="
            sidebar_title
            whitespace-nowrap
            text-lg
            font-medium
            text-purple
          "
        >
          客服平台
        </div>
      </div>
      <div
        class="
          flex
          mt-4
          sm:mt-0
          justify-between
          sm:justify-center sm:hidden
          xxs:flex
        "
      >
        <span class="sidabar_user_name text-sm text-gray-2">盧立倫</span>
        <router-link
          to="/CsRoom/score"
          :class="[
            'sidabar_user_score',
            menu.active === 3 ? 'bg-green-w50 ' : 'bg-white',
          ]"
          @click="menu.active = 3"
        >
          <StarIcon class="w-4 text-green-Default" />
          <span>4.9</span>
        </router-link>
      </div>
    </div>
    <ul class="sidebar_menu">
      <router-link
        v-for="item in menu.list"
        :to="item.router"
        @click="menu.active = item.id"
        :class="[
          'flex items-center sm:justify-center sm:h-11 cursor-pointer font-normal text-gray-1 leading-7 px-8 lg:px-3.5 py-1.5 sm:text-center ',
          menu.active === item.id ? 'bg-green-w50 ' : 'bg-transparent',
        ]"
        :key="item.id"
      >
        {{ item.name }}
      </router-link>
    </ul>
  </div>
  <!-- mobile -->
  <div
    class="
      sidebar_section--mobile
      h-16
      px-7
      w-full
      hidden
      sm:flex
      items-center
      justify-between
      bg-green-w20
      fixed
      top-0
      left-0
      z-50
    "
  >
    <div class="flex items-center">
      <div class="flex items-center justify-between">
        <div class="sidebar_logo w-9 mr-2 flex">
          <CSLogo />
        </div>
        <div
          class="
            sidebar_title
            whitespace-nowrap
            text-lg
            font-medium
            text-purple
          "
        >
          客服平台
        </div>
      </div>
      <div class="mx-5 flex items-center justify-between xxs:hidden">
        <span class="sidabar_user_name text-sm text-gray-2 whitespace-nowrap"
          >盧立倫</span
        >
        <router-link
          to="/CsRoom/score"
          :class="[
            'sidabar_user_score',
            menu.active === 3 ? 'bg-green-w50 ' : 'bg-white',
          ]"
          @click="menu.active = 3"
        >
          <StarIcon class="w-4 text-green-Default" />
          <span>4.9</span>
        </router-link>
      </div>
    </div>
    <Hamburger @click="hamOpen = !hamOpen" class="cursor-pointer" />
  </div>
</template>

<style scoped>
.sidebar_menu li.active {
  @apply bg-green-w50;
}
.sidabar_user_score {
  @apply px-2 mx-4 lg:mx-2 flex items-center cursor-pointer text-sm text-green-b50 hover:bg-green-w50 rounded-xl ease-out duration-200;
}
.sidebar_section {
  @apply w-48 lg:w-36 sm:w-full h-full sm:h-fit bg-green-w20 fixed z-30 top-0 sm:top-16 left-0 shadow-layer1 border-b border-solid;
}
</style>
