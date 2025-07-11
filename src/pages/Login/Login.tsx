import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { login } from '../../redux/user/slice'
import { filterUserByUsername } from '../../services/user'
import type { IUserDataLogin } from '../../types/authService'
import type { IFormLoginData } from '../../types/formLoginData'
import type { IUser } from '../../types/user'
import { searchToken } from '../../utils/searchToken'
import {
  ErrorMessage,
  FormLogin,
  FormTittle,
  HelpText,
  InputForm,
  MainLoginContainer,
  SubmmitButton,
} from './styles'

const defaultValues: IFormLoginData = {
  password: '',
  username: '',
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

  const notify = () =>
    toast.success('Login successful', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light',
      style: {
        fontSize: `1.5rem`,
      },
      transition: Bounce,
    })

  const notifyError = (message: string) =>
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light',
      style: {
        fontSize: `1.5rem`,
      },
      transition: Bounce,
    })

  const onSubmit = async (data: IUserDataLogin) => {
    try {
      await searchToken(data)
      const user: IUser = await filterUserByUsername(data.username)
      dispatch(login(user))
      notify()
      navigate('/')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error while logging in.'
      notifyError(message)
    } finally {
      reset()
    }
  }
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = JSON.parse(token)

          const username = localStorage.getItem('username')?.replace(/"/g, '')
          if (!username) return
          const user = await filterUserByUsername(username)
          dispatch(login(user))
          navigate('/')
        } catch (err) {
          notifyError('Error restoring session')
        }
      }
    }

    restoreSession()
  }, [])

  return (
    <MainLoginContainer>
      <FormLogin onSubmit={handleSubmit(onSubmit)}>
        <FormTittle>Login</FormTittle>
        <InputForm>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username"
            autoComplete="username"
            {...register('username', { required: 'This fild is required' })}
          />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        </InputForm>
        <InputForm>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            {...register('password', { required: 'This fild is required' })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
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
