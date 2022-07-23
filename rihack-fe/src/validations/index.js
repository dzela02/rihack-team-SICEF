const NUMBERS_ONLY = /^[1-9][0-9]{0,2}(,?[0-9]{3})*(\.[0-9]+)?$/i;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const VALID = undefined;

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const required = (errorMessage) => (value) => value ? undefined : errorMessage;

const minChars = (min, errorMessage) => (value) =>
  value && value.length >= min ? undefined : errorMessage;

const maxValue = (max, errorMessage) => (value) =>
  value && parseInt(value) <= max ? undefined : errorMessage;

const emailValidation = (errorMessage) => (value) =>
  EMAIL_REGEX.test(value) ? undefined : errorMessage;

const onlyNumbers = (errorMessage) => (value) => {
  return NUMBERS_ONLY.test(value) ? VALID : errorMessage;
};

const exactLength = (length, errorMessage) => (value) =>
  value?.length === length ? undefined : errorMessage;

export {
  composeValidators,
  required,
  minChars,
  emailValidation,
  onlyNumbers,
  EMAIL_REGEX,
  exactLength,
  maxValue,
};
