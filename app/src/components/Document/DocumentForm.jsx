import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import WYSIWYGEditor from './WYSIWYG';

const DocumentForm = ({ editorContent, onSubmit, register, control, formErrors, apiError, isSubmitting }) => (
  <form onSubmit={onSubmit}>
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="name"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Name
      </label>
      <input
        id="name"
        name="name"
        className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        ref={register}
      />
      {formErrors?.name && (
        <p className="text-red-500 text-xs italic mt-1">
          {formErrors.name.message}
        </p>
      )}
    </div>
    <div className="col-span-6 sm:col-span-3 mt-6">
      <label
        htmlFor="body"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        Body
      </label>
      <Controller
        name="body"
        control={control}
        defaultValue=''
        render={({ onChange }) => <WYSIWYGEditor editorContent={editorContent} onChange={onChange} className="mt-4" />}
      />
      {formErrors?.body && (
        <p className="text-red-500 text-xs italic mt-1">
          {formErrors.body.message}
        </p>
      )}
    </div>

    {apiError && (
      <p className="text-red-500 text-xs italic mt-4 text-center">{apiError}</p>
    )}

    <div className="my-4 flex justify-end">
      <button disabled={isSubmitting} type="submit" className="px-5 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none">
        {isSubmitting ? 'Please wait' : 'Save'}
      </button>
    </div>
  </form>
)

DocumentForm.propTypes = {
  editorContent : PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  apiError: PropTypes.string,
  isSubmitting: PropTypes.bool.isRequired,
};

export default memo(DocumentForm);