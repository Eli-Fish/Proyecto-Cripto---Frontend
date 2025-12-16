<template>
  <div class="contenedor">
    <h2>Historial de Movimientos</h2>

    <label>Seleccionar Cliente:</label>
    <select v-model="clienteSeleccionado">
      <option value="">-- Seleccione un cliente --</option>
      <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
        {{ cliente.nombreApellido }}
      </option>
    </select>

    <button @click="cargarTransacciones">Cargar Movimientos</button>

    <table v-if="transacciones.length">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Cripto</th>
          <th>Tipo</th>
          <th>Cantidad</th>
          <th>Monto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trans in transacciones" :key="trans.id">
          <td>{{ new Date(trans.fecha).toLocaleString() }}</td>
          <td>{{ trans.codigoCripto }}</td>
          <td>{{ trans.tipo }}</td>
          <td>{{ trans.cantidadCripto }}</td>
          <td>{{ formatearMonto(trans.montoActualizado) }}</td>
          <td>
            <button @click="leerTransaccion(trans)">Leer</button>
            <button @click="editarTransaccion(trans)">Editar</button>
            <button @click="borrarTransaccion(trans.id)">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="editando" class="editor">

      <h3>Editando transacción ID {{ transaccionActual.id }}</h3>

      <label>Cantidad Cripto:</label>
      <input v-model="formEdicion.cantidadCripto" type="number" step="0.00001" />

      <label>Criptomoneda:</label>
      <select v-model="formEdicion.codigoCripto">
        <option value="btc">Bitcoin</option>
        <option value="usdc">USDC</option>
        <option value="eth">Ethereum</option>
      </select>

      <label>Tipo:</label>
      <select v-model="formEdicion.tipo">
        <option value="compra">Compra</option>
        <option value="venta">Venta</option>
      </select>

      <br>

      <button @click="guardarEdicion">Guardar Cambios</button>
      <button @click="cancelarEdicion">Cancelar</button>

    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      clientes: [],
      clienteSeleccionado: "",
      transacciones: [],
      error: "",
      editando: false,
      transaccionActual: null,
      formEdicion: {
        monto: "",
        cantidadCripto: "",
        codigoCripto: "",
        tipo: ""
      }
    };
  },

  mounted() {
    this.obtenerClientes();
  },

  methods: {
    async obtenerClientes() {
      try {
        const respuesta = await axios.get("https://localhost:7038/cliente");
        this.clientes = respuesta.data;
      } catch (err) {
        console.error(err);
        this.error = "No se pudo cargar la lista de clientes.";
      }
    },

    async cargarTransacciones() {
      if (!this.clienteSeleccionado) {
        this.error = "Seleccione un cliente.";
        return;
      }
      this.error = "";
      try {
        const respuesta = await axios.get(
          `https://localhost:7038/transacciones?clienteId=${this.clienteSeleccionado}`
        );
        this.transacciones = respuesta.data;
      } catch (err) {
        console.error(err);
        this.error = "No se pudieron cargar las transacciones.";
      }
    },

    leerTransaccion(trans) {
      alert(`Detalle:\n${JSON.stringify(trans, null, 2)}`);
    },

    editarTransaccion(trans) {
      this.editando = true;
      this.transaccionActual = trans;
      this.formEdicion = {
        cantidadCripto: trans.cantidadCripto,
        codigoCripto: trans.codigoCripto,
        tipo: trans.tipo,
        clienteId: trans.clienteId
      };
      
    },

    async guardarEdicion() {
      try {
        await axios.put(
          `https://localhost:7038/transacciones/${this.transaccionActual.id}`,
          this.formEdicion
        );

        alert("Transacción actualizada correctamente.");
        this.cargarTransacciones();
        this.editando = false;

      } catch (err) {
        console.error(err);
        alert("Error al actualizar la transacción.");
      }
    },

    cancelarEdicion() {
      this.editando = false;
      this.transaccionActual = null;
    },

    async borrarTransaccion(id) {
      if (!confirm("¿Desea eliminar esta transacción?")) return;

      try {
        await axios.delete(`https://localhost:7038/transacciones/${id}`);
        this.transacciones = this.transacciones.filter(t => t.id !== id);
      } 
      catch (err) {
        console.error(err);
        alert("No se pudo borrar la transacción.");
      }
    },

    formatearMonto(valor) {
      return valor.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS"
      });
    }
  }
};
</script>

<style scoped>
.contenedor {
  margin-left: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: white;
}

select, button {
  margin-top: 10px;
  padding: 6px 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: center;
  align-items: center;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
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
  margin-top: 10px;
}
</style>