import React, { useCallback } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import {
  composeValidators,
  emailValidation,
  required,
} from '../../validations';
import { toast } from 'react-toastify';
import { login } from '../../api/auth/index';
import credentialsService from '../../services/credentialsService';
import TextFieldAdapter from '../../components/TextFieldAdapter/TextFieldAdapter.component';

import './Login.styles.scss';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const { data } = await login(values);
        credentialsService.saveAuthBody(data);
        const {
          data: {
            user: { role },
          },
        } = data;

        if (role === 'admin') {
          navigate('/backoffice');
        } else {
          navigate('/');
        }
      } catch (e) {
        toast.error('Invalid credentials');
      }
    },
    [navigate]
  );

  return (
    <div className="login-page">
      <div className="login-page__exit" onClick={() => navigate('/')} />
      <div>
        <img
          src="/assets/images/ecorijeka_transparent.png"
          alt=""
          className="login-page__logo"
        />
        <div>
          <p>Welcome to Eco Rijeka</p>
          <p>Please log in or sign up to continue</p>
        </div>
      </div>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, valid }) => (
          <form
            onSubmit={handleSubmit}
            className="login-page__form"
            autoComplete="off"
          >
            <Field
              name="email"
              component={TextFieldAdapter}
              label={'Email*'}
              placeholder={'example@email.com'}
              validate={composeValidators(
                required('This field is required'),
                emailValidation('Invalid email address')
              )}
            />
            <Field
              name="password"
              component={TextFieldAdapter}
              label={'Password*'}
              placeholder={'Enter your password'}
              type="password"
              validate={composeValidators(required('This field is required'))}
            />
            <Button
              className="login-page__form__login"
              type="submit"
              disabled={submitting || !valid}
            >
              Log in
            </Button>
            <p style={{ marginTop: '20px' }}>Don't have account?</p>
            <Button
              className="login-page__form__signup"
              onClick={() => navigate('/signup')}
              disabled={submitting}
            >
              Sign up
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default Login;
