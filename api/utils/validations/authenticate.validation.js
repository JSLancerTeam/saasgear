import Validator from 'fastest-validator';

function loginValidation(data) {
  const validator = new Validator();
  const schema = {
    email: { type: 'email' },
    password: { type: 'string', min: 6 },
  };
  return validator.validate(data, schema);
}

function registerValidation(data) {
  const validator = new Validator();
  const schema = {
    email: { type: 'email' },
    password: { type: 'string', min: 6 },
    name: { type: 'string', empty: false },
  };
  return validator.validate(data, schema);
}

export { loginValidation, registerValidation };
