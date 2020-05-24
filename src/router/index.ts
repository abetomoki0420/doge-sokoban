import VueRouter from "vue-router";
import Game from "@/components/Game.vue";
import Editor from "@/components/Editor.vue";
import List from "@/components/List.vue";

export const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Game
    },
    {
      path: "/editor",
      component: Editor
    },
    {
      path: "/list",
      component: List
    }
  ]
});
