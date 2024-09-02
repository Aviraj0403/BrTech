import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { EMAIL } from '../../constants/patterns';
import './RegisterPage.css';

export default function RegisterPage() {
  const { user, register: registerUser, loading, error } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (user) {
      navigate(returnUrl || '/');
    }
  }, [user, navigate, returnUrl]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async data => {
    try {
      await registerUser(data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="main-registerpage-container">
      <div className="register-container">
        <div className="register-box">
          <h1 className="register-title">Register</h1>
          <form className="register-form" onSubmit={handleSubmit(submit)} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-input"
                autoComplete="name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 5,
                    message: 'Name must be at least 5 characters long',
                  },
                })}
              />
              <p className="form-error">{errors.name?.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: EMAIL,
                    message: 'Invalid email address',
                  },
                })}
              />
              <p className="form-error">{errors.email?.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 5,
                    message: 'Password must be at least 5 characters long',
                  },
                })}
              />
              <p className="form-error">{errors.password?.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: value =>
                    value !== getValues('password')
                      ? 'Passwords do not match'
                      : true,
                })}
              />
              <p className="form-error">{errors.confirmPassword?.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-input"
                autoComplete="street-address"
                {...register('address', {
                  required: 'Address is required',
                  minLength: {
                    value: 10,
                    message: 'Address must be at least 10 characters long',
                  },
                })}
              />
              <p className="form-error">{errors.address?.message}</p>
            </div>

            <button type="submit" className="register-button">
              {loading ? 'Registering...' : 'Register'}
            </button>

            <div className="login-link">
              Already a user? &nbsp;
              <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                Login here
              </Link>
            </div>

            {error && <p className="form-error">Registration failed: {error.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
