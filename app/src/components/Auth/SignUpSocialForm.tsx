import React from 'react';
import PropsType from 'prop-types';
import TheLockSvg from '@/assets/images/svg/the-lock.svg';
import { ReactHookFormType } from "@/typeReactHookForm";

type Props = ReactHookFormType & {
  errorAPI?: string;
}

const SignUpSocialForm: React.FC<Props> = ({
  onSubmit,
  formErrors,
  register,
  errorAPI,
}) => (
  <form className="mt-8" onSubmit={onSubmit}>
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Email
      </label>
      <input
        id="email"
        name="email"
        ref={register}
        className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      />
      {formErrors?.email && (
        <p className="text-red-500 text-xs italic mt-1">
          {formErrors.email.message}
        </p>
      )}
    </div>
    <div className="mt-6">
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        // disabled={isSubmitting}
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <img
            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
            src={TheLockSvg}
            alt="the-lock"
          />
        </span>
        Please wait
        {/* {isSubmitting ? 'Please wait' : submitText} */}
      </button>
    </div>
    {errorAPI && (
      <p className="text-red-500 text-xs italic mt-1">{errorAPI}</p>
    )}
  </form>
);

SignUpSocialForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  formErrors: PropsType.object,
  errorAPI: PropsType.string,
};

export default SignUpSocialForm;