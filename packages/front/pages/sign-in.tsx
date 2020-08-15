import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import cn from 'classnames';

type FormData = { email: string; password: string; rememberMe: boolean };
const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});
export default function SignIn() {
  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = handleSubmit((data) => console.log('submited:', data));
  return (
    <div className="body-container text-center">
      <form className="form-signin" onSubmit={onSubmit}>
        <img
          alt="profile"
          className="mb-4"
          src="/images/profile.jpg"
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label className="sr-only">Email address</label>
        <input
          autoFocus
          name="email"
          className={cn('form-control', { 'is-invalid': errors.email })}
          placeholder="Email address"
          ref={register}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
        <label className="sr-only">Password</label>
        <input
          type="password"
          name="password"
          className={cn('form-control', { 'is-invalid': errors.password })}
          placeholder="Password"
          ref={register}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
        <div className="checkbox mb-3">
          <label>
            <input
              type="checkbox"
              value="remember-me"
              ref={register}
              name="rememberMe"
            />
            Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017-2020</p>
      </form>
    </div>
  );
}
