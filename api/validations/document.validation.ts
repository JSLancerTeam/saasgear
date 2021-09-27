import Validator, { ValidationError } from 'fastest-validator';

/**
 * Validation Create Document
 *
 * @export
 */

type CreateInfo = {
  name: string;
  body: string;
}

export function createValidation(data: CreateInfo): true | ValidationError[] {
  const validator = new Validator();
  const schema = {
    name: { type: 'string' },
    body: { type: 'string' },
  };
  return validator.validate(data, schema);
}
