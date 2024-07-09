import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import styles from "../styles/styles.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { login, loading, error } = useLogin();
  const onSubmit = async (data) => {
    await login(data.email, data.password);
    reset({ email: "", password: "" });
  };
  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>LOGIN</h2>
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: "Required field" })}
        />
        <p>{errors.email?.message}</p>
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: "Required field" })}
        />
        <p>{errors.password?.message}</p>
        <button className={styles.submit} type="submit" disabled={loading}>
          Log In
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
