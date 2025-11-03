import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Services } from '../../services'
import type { IUserDataLogin } from '../../types/authService'
import type { IFormLoginData } from '../../types/formLoginData'
import {
  ErrorMessage,
  FormLogin,
  FormTittle,
  HelpText,
  InputForm,
  MainLoginContainer,
  SubmmitButton,
} from './styles'
import { login } from '../../redux/user/slice'

const defaultValues: IFormLoginData = {
  email: '',
  password_hash: '',
}

export default function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginData>({
    defaultValues,
    mode: 'onBlur',
  })

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onSubmit = async (data: IUserDataLogin) => {
    try {
      const acessToken = await Services.authService.authenticateUser(data);
      dispatch(login(acessToken))
      navigate('/')
    } catch (error: unknown) {
      const message = error.message;
      console.log(message)
    }
  }

  return (
    <MainLoginContainer>
      <FormLogin onSubmit={handleSubmit(onSubmit)}>
        <FormTittle>Login</FormTittle>
        <InputForm>
          <label htmlFor="email">email</label>
          <input
            type="text"
            placeholder="email"
            autoComplete="email"
            {...register('email', { required: 'This fild is required' })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputForm>
        <InputForm>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            {...register('password_hash', { required: 'This fild is required' })}
          />
          {errors.password_hash && <ErrorMessage>{errors.password_hash.message}</ErrorMessage>}
        </InputForm>
        <SubmmitButton type="submit" aria-label="Log in to your account">
          Log in
        </SubmmitButton>
        <HelpText role="note">
          Don't have an account?
          <Link to="/auth/register"> Register</Link>
        </HelpText>
      </FormLogin>
    </MainLoginContainer>
  )
}
