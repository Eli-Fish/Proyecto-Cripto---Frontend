<<template>
  <div class="contenedor">
    <h2>Alta de Nuevo Cliente</h2>

    <form @submit.prevent="guardarCliente" class="form-cliente">

      <label>Nombre y Apellido:</label>
      <input type="text" v-model="cliente.nombreApellido" />
      <span v-if="errores.nombre" class="error">{{ errores.nombre }}</span>

      <label>Email:</label>
      <input type="email" v-model="cliente.email" />
      <span v-if="errores.email" class="error">{{ errores.email }}</span>

      <button type="submit">Guardar</button>
    </form>

    <p v-if="mensaje" class="exito">{{ mensaje }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cliente: {
        nombre: "",
        email: ""
      },
      errores: {},
      mensaje: ""
    };
  },

  methods: {
    validar() {
      this.errores = {};

      if (!this.cliente.nombreApellido)
        this.errores.nombreApellido = "El nombre no puede estar vacío.";

      const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.cliente.email)
        this.errores.email = "El email no puede estar vacío.";
      else if (!patronEmail.test(this.cliente.email))
        this.errores.email = "El formato de email no es válido.";

      return Object.keys(this.errores).length === 0;
    },

    async guardarCliente() {
      if (!this.validar()) return;

      try {
        await axios.post("https://localhost:7038/cliente", this.cliente);

        this.mensaje = "✅ Cliente guardado con éxito";
        this.cliente = { nombre: "", email: "" }; 

      } catch (error) {
        console.error(error);
        alert("❌ Error al guardar el cliente.");
      }
    }
  }
};
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

.form-cliente {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.form-cliente label {
  margin-top: 10px;
  font-weight: bold;
}

.form-cliente input {
  padding: 6px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
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


.error { color: red; font-size: 0.8rem; }
.exito { color: green; margin-top: 10px; }
</style>