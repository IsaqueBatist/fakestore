import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/svg/fakestore.svg'
import { selectProductsCount } from '../../redux/cart/cart.selectors'
import Cart from '../Cart/Cart'
import {
  DropdownMenu,
  ImageContainer,
  MainContainer,
  Navbar,
  ProfileWrapper,
  StoreContainer,
  UserContainer,
  UserName,
  UserProfile,
} from './styles'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { logout } from '../../redux/auth/authSlice.slice'

export default function Header() {
  const [cartVisibla, setCartVisible] = useState(false)

  const navigate = useNavigate()
  const productCount = useAppSelector(selectProductsCount)

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth/login')
    localStorage.removeItem('authToken')
  }

  return (
    <MainContainer>
      <StoreContainer>
        <ImageContainer src={Logo} alt="FakeStore Icon with Title" />
        <h2>FakeStore</h2>
      </StoreContainer>
      <Navbar>
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </Navbar>
      <UserContainer role="complementary">
        <UserName>Teste</UserName>
        <ProfileWrapper>
          <UserProfile src={`https://api.dicebear.com/7.x/adventurer/svg?seed=teste`} />
          <DropdownMenu>
            <button type="button" onClick={handleLogout}>
              Sair
            </button>
          </DropdownMenu>
        </ProfileWrapper>
        <ShoppingCart size={30} onClick={() => setCartVisible(true)} />
        <Cart isVisible={cartVisibla} setCartVisible={setCartVisible} />({productCount})
      </UserContainer>
    </MainContainer>
  )
}
