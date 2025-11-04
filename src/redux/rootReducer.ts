import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cart/slice'
import authReducer from './auth/authSlice.slice'

const rootReducer = combineReducers({cartReducer, authReducer})

export default rootReducer;