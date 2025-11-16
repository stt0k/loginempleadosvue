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

// Exportar una instancia del servicio
export const serviceEmpleados = new ServiceEmpleados();

export default serviceEmpleados;
