import axios from "axios";
import type { IUserDataLogin } from "../types/authService";
import api from "./api";

export const authenticateUser = async (userData: IUserDataLogin): Promise<string> => {
  try {
    const response = await api.post('/login', userData)
    const accessToken = response.data.accessToken
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    localStorage.setItem('authToken', accessToken);
    return accessToken
  } catch (error) {
    console.error(error)
    if(axios.isAxiosError(error) && error.request){
      throw new Error(error.response?.data.errors.default)
    }else{
      throw new Error("Erro inesperado")
    }
  }
  
}