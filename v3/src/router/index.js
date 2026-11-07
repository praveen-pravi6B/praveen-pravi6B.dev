import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

/**
 * v3 is built with base `/v3/` so its assets live at `/v3/assets/*`, but the
 * Cloudflare worker serves its index.html at the site root. The router itself
 * therefore needs a `/` base in production and `/v3/` under `npm run dev:v3`.
 */
const base = import.meta.env.DEV ? "/v3/" : "/";

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogIndexView.vue"),
    },
    {
      path: "/blog/:gistId",
      name: "blog-post",
      component: () => import("../views/BlogPostView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved;

    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }

    return { top: 0 };
  },
});

export default router;
