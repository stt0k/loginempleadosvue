import axios from "axios";
import Global from "../Global.js";

export class ServiceEmpleados {
  async getToken(user) {
    const request = "auth/login";
    const url = Global.URL_AUTH + request;
    const response = await axios.post(url, user);
    return response.data.response;
  }

  async getPerfil() {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const request = "api/empleados/perfilempleado";
    const url = Global.URL_AUTH + request;
    const response = await axios.get(url, { headers });
    return response.data;
  }

  async getSubordinados() {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const request = "api/Empleados/Subordinados";
    const url = Global.URL_AUTH + request;
    const response = await axios.get(url, { headers });
    return response.data;
  }

  async getEmpleados() {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const request = "api/empleados";
    const url = Global.URL_AUTH + request;
    const response = await axios.get(url, { headers });
    return response.data;
  }

  async getEmpleadoById(id) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const request = `api/Empleados/${id}`;
    const url = Global.URL_AUTH + request;
    const response = await axios.get(url, { headers });
    return response.data;
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  logout() {
    localStorage.removeItem("token");
  }
}

export class ServiceFutbol {
  // JUGADORES
  async getJugadores() {
    const request = "api/jugadores";
    const url = Global.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async getJugadorById(id) {
    const request = `api/jugadores/${id}`;
    const url = Global.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async getJugadoresPorEquipo(idEquipo) {
    const jugadores = await this.getJugadores();
    return jugadores.filter(
      (jugador) => jugador.idEquipo === parseInt(idEquipo)
    );
  }

  async buscarJugadores(nombreJugador) {
    const request = `api/jugadores/buscarjugadores/${nombreJugador}`;
    const url = Global.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async createJugador(jugador) {
    const request = "api/jugadores";
    const url = Global.URL_FUTBOL + request;
    const response = await axios.post(url, jugador);
    return response.data;
  }

  async updateJugador(idJugador, idEquipo) {
    const request = `api/jugadores/${idJugador}/${idEquipo}`;
    const url = Global.URL_FUTBOL + request;
    const response = await axios.put(url);
    return response.data;
  }

  async deleteJugador(id) {
    const request = `api/jugadores/${id}`;
    const url = Global.URL_FUTBOL + request;
    const response = await axios.delete(url);
    return response.data;
  }

  // EQUIPOS
  async getEquipos() {
    const request = "api/equipos";
    const url = Global.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async getEquipoById(id) {
    const request = `api/equipos/${id}`;
    const url = Global.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async createEquipo(equipo) {
    const request = "api/equipos";
    const url = Global.URL_FUTBOL + request;
    const response = await axios.post(url, equipo);
    return response.data;
  }
}

export class ServiceApuestas {
  // APUESTAS
  async getApuestas() {
    const request = "api/apuestas";
    const url = Global.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async createApuesta(apuesta) {
    const request = "api/apuestas";
    const url = Global.URL_FUTBOL + request;
    const response = await axios.post(url, apuesta);
    return response.data;
  }

  async deleteApuesta(id) {
    const request = `api/apuestas/${id}`;
    const url = Global.URL_FUTBOL + request;
    const response = await axios.delete(url);
    return response.data;
  }
}

// Exportar una instancia del servicio
export const serviceEmpleados = new ServiceEmpleados();
export const serviceFutbol = new ServiceFutbol();
export const serviceApuestas = new ServiceApuestas();

export default serviceEmpleados;
