import VueRouter from "vue-router";
import Top from "@/components/Top.vue";
import Game from "@/components/Game.vue";
import Editor from "@/components/Editor.vue";
import List from "@/components/List.vue";

export const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Top
    },
    {
      path: "/game",
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
