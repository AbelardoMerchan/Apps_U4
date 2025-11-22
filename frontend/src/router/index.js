import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import ProductFormView from "@/views/ProductFormView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

// Lazy loading para estas vistas
const CartView  = () => import("@/views/CartView.vue");
const AboutView = () => import("@/views/AboutView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // /  -> Home / Catálogo
    { path: "/", name: "home", component: HomeView },

    // Ruta dinámica por id: /product/:id (detalle)
    { path: "/product/:id", name: "product-detail", component: ProductDetailView, props: true },

    // Extra: formulario (no lo exige aquí pero lo usamos en otra tarea)
    { path: "/product/new", name: "product-new", component: ProductFormView },
    { path: "/product/:id/edit", name: "product-edit", component: ProductFormView, props: true },

    // /cart
    { path: "/cart", name: "cart", component: CartView },

    // /about
    { path: "/about", name: "about", component: AboutView },

    // Ruta 404 (catch-all)
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
  ],
});

export default router;

