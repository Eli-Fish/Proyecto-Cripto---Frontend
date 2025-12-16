<template>
  <div class="contenedor">
    <h2>Venta de Criptomonedas</h2>

    <form @submit.prevent="registrarVenta" class="form-venta">

      <label>Criptomoneda:</label>
      <select v-model="cripto">
          <option value="btc">Bitcoin</option>
          <option value="usdc">USDC</option>
          <option value="eth">Ethereum</option>
      </select>

      <label>Cantidad:</label>
      <input type="number" step="0.00001" v-model="cantidad" />

      <label>Cliente:</label>
      <select v-model="clienteSeleccionado">
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombreApellido }}
        </option>
      </select>

      <label>Fecha y hora de compra:</label>
      <input type="datetime-local" v-model="fecha" readonly />

      <button type="submit">Registrar Venta</button>

      <p class="error" v-if="error">{{ error }}</p>
      <p class="exito" v-if="exito">{{ exito }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cripto: "",
      cantidad: "",
      clienteSeleccionado: "",
      fecha: "",
      clientes: []
    };
  },

  mounted() {
    this.obtenerClientes();
    const ahora = new Date();
    ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
    this.fecha = ahora.toISOString().slice(0, 16);
  },

    methods: {
    async obtenerClientes() {
      const respuesta = await axios.get("https://localhost:7038/cliente");
      this.clientes = respuesta.data;
    },

        async registrarVenta() {
        if (!this.cripto || !this.cantidad || !this.clienteSeleccionado || !this.fecha) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        
        try {
            await axios.post("https://localhost:7038/transacciones", {
                codigoCripto: this.cripto.toLowerCase(),
                clienteId: this.clienteSeleccionado,
                cantidadCripto: this.cantidad,
                fecha: this.fecha,
                tipo: "venta"
                });
                
                alert("Venta realizada exitosamente.");
                this.cripto = "";
                this.cantidad = "";
                this.clienteSeleccionado = "";
            } catch (error) {
                if (error.response) {
                    alert("Error: " + (error.response.data.mensaje || error.response.data));
                } 
                else if (error.request) {
                    alert("No se pudo conectar con el servidor.");
                }
                else {
                    alert("Ocurrió un error: " + error.message);
                }
            }
        }
    }
  }
  
</script>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: white;
}
.form-venta {
  display: flex;
  flex-direction: column;
  width: 300px;
}

label {
  margin-top: 10px;
  font-weight: bold;
}

input, select {
  padding: 6px;
  margin-top: 4px;
}

button {
  background: linear-gradient(90deg, #d4af37, #f7e278);
  border: none;
  padding: 4px 8px;
  font-size: 18px;
  font-weight: bold;
  color: #2b2b2b;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s ease;
    margin-top: 30px;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 18px #f7e278;
}

.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 10px;
}

.exito {
  color: green;
  margin-top: 10px;
}
</style>