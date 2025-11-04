import { jwtDecode } from "jwt-decode";
import type { UserJWT } from "../types/user";

export const decodeJWT = (): UserJWT => {
  const token = localStorage.getItem('authToken');
  
  if(token){
    try {
      const decodedToken: UserJWT = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();
      console.log(decodedToken)
      if (isExpired) {
        // Chamar sua função de logout aqui
      }
      return decodedToken;
    } catch (error) {
      console.error(error)
      throw new Error("Error while decoding jwt token");
    }
  }
  throw new Error("Token not")
}