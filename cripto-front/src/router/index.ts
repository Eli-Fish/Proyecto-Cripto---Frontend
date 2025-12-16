import { createRouter, createWebHistory } from "vue-router";

import Inicio from "../views/Inicio.vue";
import AltaCliente from "../views/AltaCliente.vue";
import AltaCompra from "../views/AltaCompra.vue";
import AltaVenta from "../views/AltaVenta.vue";
import HistorialMovimientos from "../views/HistorialMovimientos.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/inicio", component: Inicio },
    { path: "/cliente", component: AltaCliente },
    { path: "/compra", component: AltaCompra },
    { path: "/venta", component: AltaVenta },
    { path: "/historial", component: HistorialMovimientos },

    { path: "/", redirect: "/inicio" },
  ],
});

export default router;