import React from 'react'
import { Link } from 'react-router-dom';
import PropsType from 'prop-types';
import AddIcon from 'assets/images/svg/add.svg';
import CheckedIcon from 'assets/images/svg/checked.svg';

export default function TeamForm({ onSubmit, register, formErrors, isEdit, loading }) {
  return (
    <form className="mt-8" onSubmit={onSubmit}>
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="teamName"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Team name
        </label>
        <input
          id="teamName"
          name="teamName"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {formErrors?.teamName && (
          <p className="text-red-500 text-xs italic mt-1">
            {formErrors.teamName.message}
          </p>
        )}
      </div>
      <div className="col-span-6 sm:col-span-3 mt-6">
        <label
          htmlFor="teamID"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Team ID
        </label>
        <input
          id="teamID"
          type="text"
          name="teamID"
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register}
        />
        {formErrors?.teamID && (
          <p className="text-red-500 text-xs italic mt-1">
            {formErrors.teamID.message}
          </p>
        )}
      </div>
      <div className="mt-6 flex  items-center">
        <button
          type="submit"
          disabled={loading}
          className="group mr-4 flex justify-center items-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        >
          <span className="flex items-center mr-2">
            <img
              className="h-3 w-3 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
              src={isEdit ? CheckedIcon : AddIcon}
              alt="the-lock"
            />
          </span>
          {isEdit ? "Save Team" : "Add Team"}
        </button>
        <Link
          to='/teams'
          className="hover:underline hover:text-blue-800 cursor-pointer text-blue-500"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}

TeamForm.propTypes = {
  onSubmit: PropsType.func.isRequired,
  register: PropsType.func.isRequired,
  formErrors: PropsType.object,
  isEdit: PropsType.bool,
  loading: PropsType.bool,
}