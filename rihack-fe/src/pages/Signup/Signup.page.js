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
import { register } from '../../api/auth/index';
import TextFieldAdapter from '../../components/TextFieldAdapter/TextFieldAdapter.component';
import credentialsService from '../../services/credentialsService';

import './Signup.styles.scss';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const { data } = await register(values);
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
        toast.error('Error');
        console.error(e);
      }
    },
    [navigate]
  );

  return (
    <div className="signup-page">
      <div className="signup-page__exit" onClick={() => navigate('/')} />
      <div>
        <img
          src="/assets/images/ecorijeka_transparent.png"
          alt=""
          className="signup-page__logo"
        />
        <h3>Sign up</h3>
        <p>
          By continuing, you are setting up a EcoRijeka account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <Form
        onSubmit={handleSubmit}
        validate={({ password, passwordConfirm }) => {
          if (password !== passwordConfirm)
            return {
              passwordConfirm: `Passwords doesn't match`,
            };
        }}
        render={({ handleSubmit, submitting, valid }) => (
          <form
            onSubmit={handleSubmit}
            className="signup-page__form"
            autoComplete="off"
          >
            <Field
              name="name"
              component={TextFieldAdapter}
              label={'Full name*'}
              placeholder={'John Doe'}
              validate={required('This field is required')}
            />
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
              validate={required('This field is required')}
            />
            <Field
              name="passwordConfirm"
              component={TextFieldAdapter}
              label={'Confirm Password*'}
              placeholder={'Confirm your password'}
              type="password"
              validate={required('This field is required')}
            />
            <Button
              type="submit"
              className="signup-page__form__signup"
              disabled={submitting || !valid}
            >
              Sign up
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default Signup;
