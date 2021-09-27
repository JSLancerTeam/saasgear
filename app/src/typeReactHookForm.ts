import { DeepMap, FieldError } from 'react-hook-form';

export interface ReactHookFormType {
  onSubmit?: (event: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
  register: (instance: HTMLInputElement | null) => void;
  errors?: DeepMap<Record<string, unknown>, FieldError>;
  formErrors?: DeepMap<Record<string, unknown>, FieldError>;
}

// isSubmitted?: boolean;
// isSubmitting?: boolean;
// apiError?: string;