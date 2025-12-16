<template>
  <div class="home-container">
    <div class="hero">
      <h1 class="title">¡Gestionar tu cartera cripto nunca fue mas facil!</h1>
      <p class="subtitle">Comprá, vendé y visualizá tus movimientos en un solo lugar.</p>

      <button class="btn-ingresar" @click="$router.push('/cliente')">
        Empezar ahora
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: #ffffff;
}

.hero {
  text-align: center;
  padding: 50px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid #d4af37;
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
  backdrop-filter: blur(8px);
  width: 60%;
}

.title {
  font-size: 40px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 15px;
  color: #efe9c7;
}

.subtitle {
  font-size: 20px;
  margin-bottom: 35px;
  color: #e2d18a;
}

.btn-ingresar {
  background: linear-gradient(90deg, #d4af37, #f7e278);
  border: none;
  padding: 14px 35px;
  font-size: 18px;
  font-weight: bold;
  color: #2b2b2b;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-ingresar:hover {
  transform: scale(1.1);
  box-shadow: 0 0 18px #f7e278;
}
</style>
