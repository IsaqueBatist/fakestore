import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Link, useNavigate } from 'react-router-dom'
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
import { loginUser } from '../../redux/auth/authThunks.thunk'
import { selectAuthLoading, selectauthReducerError } from '../../redux/auth/authSelectors.selector'

const defaultValues: IFormLoginData = {
  email: '',
  password_hash: '',
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginData>({
    defaultValues,
    mode: 'onBlur',
  })

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectauthReducerError);
  const navigate = useNavigate()

  const onSubmit = async (data: IUserDataLogin) => {
    try {
      await dispatch(loginUser(data)).unwrap
      navigate('/')
    } catch (error: unknown) {
      if(error instanceof Error){
        const message = error.message;
        console.log(message)
      }
    }
  }

  return (
    <MainLoginContainer>
      {isLoading && 'Carregando'}
      {error && (<p>{error}</p>)}
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
