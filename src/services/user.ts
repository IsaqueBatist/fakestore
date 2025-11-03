import type { IFormRegisterData } from '../types/formRegisterData'
import type { IFavorite } from '../types/user'
import api from './api'

export const registerUser = async (userData: IFormRegisterData): Promise<number> => {
  const response = await api.post('/register', userData)
  return response.data;
}

export const getFavorites = async (): Promise<IFavorite[]> => {
  const response = await api.get('/favorites')
  return response.data
}

export const addFavorite = async (product_id: number): Promise<number> => {
  const response = await api.post('/favorites', {product_id})
  return response.data
}

export const deleteFavorite = async(product_id: number):Promise<void> => {
  return await api.delete(`/favorites/${product_id}`);
}
