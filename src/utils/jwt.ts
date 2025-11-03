import { jwtDecode } from "jwt-decode";
import type { UserJWT } from "../types/user";

export const decodeJWT = () => {
  const token = localStorage.getItem('authToken');
  
  if(token){
    try {
      const decodedToken: UserJWT = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        console.log('Token expirado!');
        // Chamar sua função de logout aqui
      }
    } catch (error) {
      console.error(error)
    }
  }

}