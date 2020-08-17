import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import cn from 'classnames';
import Link from 'next/link';
import { useErrorHandler, useAuth } from '../../lib/hooks';

type FormData = {
  email: string;
  password: string;
  confirmation?: string;
  rememberMe: boolean;
};
const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

export default function SignIn() {
  const { register, handleSubmit, errors, watch } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const [isSignUp, setIsSignUp] = useState(false);

  // error handling
  const watchChange = watch(['password', 'email', 'confirmation']);
  const resetErrorFields = [watchChange.password, watchChange.email];
  const [error, catchError] = useErrorHandler(resetErrorFields);

  // submit
  const auth = useAuth();
  const onSubmit = handleSubmit(async (data) => {
    if (isSignUp) auth.signUp(data.email, data.password).catch(catchError);
    else auth.login(data.email, data.password).catch(catchError);
  });

  const signText = isSignUp ? 'up' : 'in';
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
        {auth.isAuthenticated && (
          <Link href="/account/me">
            <button className="btn btn-link" type="button">
              You are already connected, check your page !
            </button>
          </Link>
        )}
        <h1 className="h3 mb-3 font-weight-normal">Please sign {signText}</h1>
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
        {isSignUp ? (
          <>
            <label className="sr-only">Password Confirmation</label>
            <input
              type="password"
              name="confirmation"
              className={cn('form-control', {
                'is-invalid': errors.confirmation,
              })}
              placeholder="Password Confirmation"
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.confirmation?.message}
            </div>
          </>
        ) : (
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
        )}
        <div>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            Sign {signText} instead
          </button>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          {auth.loading ? (
            <span className="spinner-border" role="status" aria-hidden="true" />
          ) : (
            `Sign ${signText}`
          )}
        </button>
        <div className="text-danger">{error}</div>
        <p className="mt-5 mb-3 text-muted">© 2017-2020</p>
      </form>
    </div>
  );
}
