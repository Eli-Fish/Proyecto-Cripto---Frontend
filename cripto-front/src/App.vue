<template>

  <div class="contenedor-app">
    <Sidebar />

    <main class="contenido">
      <RouterView />
    </main>
  </div>

</template>

<script>

import Sidebar from "./components/SiderBar.vue";

export default {
  components: { Sidebar },
};
</script>

<style>
.contenedor-app {
  display: flex;
  height: 100vh;
  align-items: center;
}

.contenido {
  margin-left: 240px;  
  width: calc(100% - 240px);      
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

body, html {
  background: linear-gradient(145deg, #1a1a1a, #2e2e2e, #4a4a4a); 
}
</style>