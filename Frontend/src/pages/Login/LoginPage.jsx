import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { EMAIL } from "../../constants/patterns";
import "./LoginPage.css";

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl") || "/";

  useEffect(() => {
    if (user) {
      navigate(returnUrl);
    }
  }, [user, navigate, returnUrl]);

  const submit = async ({ email, password }) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="main-loginpage-container">
      <div class="login-container">
      <div class="login-box">
        <h1 class="login-title">Login</h1>
        <form class="login-form" onSubmit={handleSubmit(submit)} noValidate>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              class="form-input"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL,
                  message: "Invalid email address",
                },
              })}
            />
            <p class="form-error">{errors.email?.message}</p>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              class="form-input"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <p class="form-error">{errors.password?.message}</p>
          </div>

          <button type="submit" class="login-button">
            Login
          </button>

          <div class="register-link">
            New user?&nbsp;
            <Link
              to={`/register${
                returnUrl ? "?returnUrl=" + encodeURIComponent(returnUrl) : ""
              }`}
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
