import { useForm } from "react-hook-form";
import {
  MainRegisterContainer,
  FormRegister,
  FormTitle,
  InputForm,
  SubmitButton,
  HelpText,
  ErrorMessage,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";
import type { IFormRegisterData } from "../../types/formRegisterData";
import { registerUser } from "../../services/user";

type IFormRegisterForm = IFormRegisterData & {
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormRegisterForm>({
    mode: 'onBlur'
  });

  const navigate = useNavigate();

  const onSubmit = async (data: IFormRegisterForm) => {
    try {
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    } finally {
      reset();
    }
  };

  const password = watch("password");

  return (
    <MainRegisterContainer>
      <FormRegister onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>Register</FormTitle>
        <InputForm>
          <label>Username</label>
          <input
            placeholder="username"
            autoComplete="username"
            {...register("username", { required: "This fild is requirted" })}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </InputForm>
        <InputForm>
          <label>Email</label>
          <input
            placeholder="exemple@gmail.com"
            autoComplete="email"
            type="email"
            {...register("email", { required: "This fild is requirted" })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputForm>
        <InputForm>
          <label>Password</label>
          <input
            type="password"
            autoComplete="new-password"
            {...register("password", { required: "This fild is requirted" })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputForm>
        <InputForm>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "This fild is requirted",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          )}
        </InputForm>

        <SubmitButton type="submit">Register</SubmitButton>

        <HelpText>
          Already have an account?
          <Link to="/auth/login"> Login</Link>
        </HelpText>
      </FormRegister>
    </MainRegisterContainer>
  );
}
