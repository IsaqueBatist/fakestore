export interface IFavorite {
  user_id: number,
  product_id: number
} 


export interface UserJWT {
  uid: string
  role: string
  exp: number
  iat: number
}