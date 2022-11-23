import Validator, { ValidationError } from 'fastest-validator';

type LoginInfo = {
  email: string;
  password: string;
};

type RegisterInfo = {
  email: string;
  password: string;
  name: string;
};

type ChangePasswordInfo = {
  password: string;
};

function loginValidation(data: LoginInfo): true | ValidationError[] | Promise<true | ValidationError[]> {
  const validator = new Validator();
  const schema = {
    email: { type: 'email' },
    password: { type: 'string', min: 6 },
  };
  return validator.validate(data, schema);
}

function registerValidation(data: RegisterInfo): true | ValidationError[] | Promise<true | ValidationError[]> {
  const validator = new Validator();
  const schema = {
    email: { type: 'email' },
    password: { type: 'string', min: 6 },
    name: { type: 'string', empty: false },
  };
  return validator.validate(data, schema);
}

function changePasswordValidation(data: ChangePasswordInfo): true | ValidationError[] | Promise<true | ValidationError[]> {
  const validator = new Validator();
  const schema = {
    password: {
      type: 'string',
      min: 6,
      max: 50,
      optional: true,
      empty: false,
    },
  };
  return validator.validate(data, schema);
}

export { loginValidation, registerValidation, changePasswordValidation };
