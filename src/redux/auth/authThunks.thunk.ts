import { createAsyncThunk } from '@reduxjs/toolkit'
import type {IUserDataLogin} from '../../types/authService'
import {Services} from '../../services/index'

export const loginUser = createAsyncThunk<string, IUserDataLogin, { rejectValue: string }>(
  'auth/loginUser',
  async (credencials: IUserDataLogin, {rejectWithValue}) => {
    try {
      const token = await Services.authService.authenticateUser(credencials);
      return token
    } catch (error) {
      if(error instanceof Error){
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Ocorreu um erro inesperado.');
    }
    
  }
)