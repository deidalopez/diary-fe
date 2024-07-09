import { useForm } from "react-hook-form";
import useSignUp from "../hooks/useSignUp";

import styles from "../styles/styles.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signup, loading, error } = useSignUp();

  const onSubmit = async (data) => {
    await signup(data.email, data.password);
    reset({ email: "", password: "" });
  };
  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>SIGN UP</h2>
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
