import type { IUserDataLogin } from "../types/authService";
import api from "./api";

export const authenticateUser = async (userData: IUserDataLogin): Promise<void> => {
  const response = await api.post('/login', userData)
  const accessToken = response.data.accessToken
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}