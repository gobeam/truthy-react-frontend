/**
 *
 * ProfilePage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import {
  changeFieldAction,
  loadProfileAction,
  resetPasswordSubmitAction,
  updateProfileFormAction,
} from 'containers/ProfilePage/actions';
import saga from 'containers/ProfilePage/saga';
import reducer from 'containers/ProfilePage/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import {
  makeConfirmPasswordSelector,
  makeDobSelector,
  makeEmailSelector,
  makeErrorSelector,
  makeImageSelector,
  makeIsLoadingSelector,
  makeNameSelector,
  makePasswordSelector,
} from 'containers/ProfilePage/selectors';

const key = 'profilePage';

const stateSelector = createStructuredSelector({
  email: makeEmailSelector(),
  name: makeNameSelector(),
  password: makePasswordSelector(),
  confirmPassword: makeConfirmPasswordSelector(),
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
  dob: makeDobSelector(),
  image: makeImageSelector(),
});

export default function ProfilePage() {
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const loadProfile = () => dispatch(loadProfileAction());
  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));
  const onImageChange = (ev) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const { files } = ev.target;
      if (files[0]) {
        const image = files[0];
        if (!image.type.includes('image')) {
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(image);
        // eslint-disable-next-line func-names
        reader.onload = function () {
          dispatch(changeFieldAction('image', reader.result));
        };
        dispatch(changeFieldAction('profile_image', image));
      }
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateProfileFormAction());
  };
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordSubmitAction());
  };
  const {
    email,
    password,
    errors,
    name,
    confirmPassword,
    dob,
    image,
  } = useSelector(stateSelector);

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className=" min-h-screen pt-2 my-16">
      <div className="container mx-auto">
        <div className="inputs w-full max-w-2xl p-6 mx-auto">
          <div className="personal w-full bg-white shadow-md rounded-lg px-4 pt-4">
            <h2 className="text-md font-bold text-gray-900">
              Account Settings
            </h2>
            <div className="flex items-center justify-between">
              <form className="mt-4" onSubmit={submitForm}>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                      htmlFor="grid-text-1"
                    >
                      Profile Picture
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-900 border border-gray-400  rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="file"
                      onChange={onImageChange}
                      name="image"
                    />

                    {image ? (
                      <div className="bg-gray-400 mt-4 rounded-lg">
                        <img
                          alt="profile"
                          src={image}
                          className="object-contain h-48 w-full "
                        />
                      </div>
                    ) : (
                      ''
                    )}

                    {errors.image}
                  </div>

                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                      htmlFor="grid-text-1"
                    >
                      Email address:
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-900 border border-gray-400  rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={onChangeField}
                      name="email"
                    />
                    {errors.email}
                  </div>

                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                      htmlFor="grid-text-1"
                    >
                      Name:{' '}
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-900 border border-gray-400  rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={onChangeField}
                      name="name"
                    />
                    {errors.name}
                  </div>

                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                      htmlFor="grid-text-1"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-900 border border-gray-400  rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="date"
                      placeholder="Enter DOB"
                      value={dob}
                      onChange={onChangeField}
                      name="dob"
                    />
                    {errors.dob}
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 ml-3 rounded-lg mb-2"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="personal w-full mt-8 pt-4 px-4 rounded-lg bg-white shadow-md">
            <h2 className="text-md font-bold text-gray-900">
              Change Password:
            </h2>
            <div className="flex items-center justify-between">
              <form
                className="mt-6 border-gray-400"
                onSubmit={resetPasswordSubmit}
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                      htmlFor="grid-text-1"
                    >
                      Password:
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-900 border border-gray-400  rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={onChangeField}
                      name="password"
                    />
                    {errors.password}
                  </div>

                  <div className="w-full md:w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                      htmlFor="grid-text-1"
                    >
                      Confirm Password:
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-900 border border-gray-400  rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="password"
                      placeholder="Enter Confirm Password"
                      value={confirmPassword}
                      onChange={onChangeField}
                      name="confirmPassword"
                    />
                    {errors.confirmPassword}
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="bg-orange-500 hover:bg-orange-700 rounded-lg text-white font-bold py-2 px-4 ml-3"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
