import Validator from 'fastest-validator';

/**
 * Validation Create Document
 *
 * @export
 * @param {object} data
 */
export function createValidation(data) {
  const validator = new Validator();
  const schema = {
    name: { type: 'string' },
    body: { type: 'string' },
  };
  return validator.validate(data, schema);
}
