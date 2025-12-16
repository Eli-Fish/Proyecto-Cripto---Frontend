<template>
    <div class="sidebar">
        <router-link to="/inicio" class="logo">mundoCRIPTON</router-link>

        <nav class="menu">
            <router-link to="/cliente" class="link" active-class="activo">
                👤 Alta de Cliente
            </router-link>
            <router-link to="/compra" class="link" active-class="activo">
                💰 Compra
            </router-link>
            <router-link to="/venta" class="link" active-class="activo">
                🛒 Venta
            </router-link>
            <router-link to="/historial" class="link" active-class="activo">
                📜 Historial de Movimientos
            </router-link>
        </nav>
    </div>
</template>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;

  background: linear-gradient(
    180deg,
    #1a1a1a 0%,
    #2e2e2e 40%,
    #4a4a4a 100%
  );

  border-right: 2px solid #d4af37;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  border-radius: 0 18px 18px 0;
  box-shadow: 6px 0px 18px rgba(0, 0, 0, 0.5);
}

.logo {
  display: block;
  font-size: 30px;
  font-weight: bold;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-decoration: none;
  color: #ffffff; 
  margin-bottom: 40px;
  letter-spacing: 2px;
  transition: 0.3s;
  white-space: nowrap;
  overflow: hidden;
}

.logo:hover {
  text-shadow: 0 0 12px rgb(238, 255, 0);
  transform: scale(1.06);
  cursor: pointer;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.link {
  text-decoration: none;
  color: #ddd;
  font-size: 17px;
  padding: 12px;
  border-radius: 10px;
  font-weight: 500;

  border-left: 3px solid transparent;
  transition: 0.3s ease-in-out;
}

/* Hover dorado */
.link:hover {
  color: #2b2b2b;
  border-left: 3px solid #eeea17;
  background-color: yellow;
  transform: translateX(6px);
}

.activo {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05));
  border-left: 3px solid #e5c05b;
  color: #f5d67b;
  transform: translateX(6px);
  font-weight: bold;
}
</style>

