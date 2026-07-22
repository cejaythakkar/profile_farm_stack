import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import  axiosClient  from '../../utils/axiosClient';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMainContext } from '../../context/MainContext';

const LoginPage = () => {
  
  const [isHide, setIsHide] = React.useState(true);

  const [isLoading, setIsLoading] = React.useState(false);
  const { fetchProfile, user, loading } = useMainContext();
  const navigate = useNavigate();
  const location = useLocation();
  const validationSchema = yup.object({
    userName: yup.string().required('User Name is Required'),
    password: yup.string().required('Password is Required'),
  });
  const initialValue = {
    userName: '',
    password: '',
  };

  useEffect(() => {
    

    if (user['_id']) {
      navigate(
        location.state
          ? location.state?.from?.pathname
          : `/${user.userName}/personal-info`,
        { replace: true },
      );
      return;
    }
  }, [user, location, navigate]);
  const onSubmithandler = async (values, helpers) => {
    try {
      setIsLoading(true);
      const response = await axiosClient.post('/auth/login', values);
      const data = await response.data;
      toast.success(data.message);
      localStorage.setItem('token', data.token || '');
      await fetchProfile();
      const user = result.data;
      navigate(`/${user.userName}/personal-info`, {
        replace: true,
      });

      helpers.resetForm();
    } catch (e) {
      toast.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (loading) return <div>Loading.....</div>;
  return (
    <div className="flex flex-1 justify-center items-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValue}
        onSubmit={onSubmithandler}
      >
        <Form className="w-[96%] mx-auto lg:w-1/2 py-10 px-8 bg-black/80 border border-gray-500 rounded-2xl shadow">
          <div className="mb-3">
            <label htmlFor="userName" className="block text-white mb-2">
              User Name <span className="text-red-500">*</span>
            </label>
            <Field
              id="userName"
              name="userName"
              type="text"
              className="w-full py-3 px-4 rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1"
              placeholder="Enter Your Email"
            />
            <ErrorMessage
              name="userName"
              className="text-red-500"
              component={'p'}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-white mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1 flex">
              <Field
                name="password"
                id="password"
                type={isHide ? 'password' : 'text'}
                className="w-full py-3 px-4 outline-none border-none"
                placeholder="Enter Your Password"
              />

              <button
                onClick={() => {
                  setIsHide(!isHide);
                }}
                type="button"
                className="px-4 cursor-pointer text-2xl"
              >
                {isHide ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <ErrorMessage
              name="password"
              className="text-red-500 w-full"
              component={'p'}
            />
          </div>
          <div className="mt-9">
            <button
              type="submit"
              disabled={isLoading ? true : false}
              className="w-full p-3
            flex justify-center items-center bg-blue-600 cursor-pointer disabled:cursor-no-drop disabled:bg-blue-500 border-none rounded hover:bg-blue-700 transition-all duration-300 gap-x-1"
            >
              <span>Login</span>
              {isLoading ? (
                <CgSpinner className="animate-spin text-xl text-white" />
              ) : (
                <FaArrowRight className="text-sm" />
              )}
            </button>
          </div>
          <div className="mt-3 flex justify-end">
            <span>
              Doesn't have account?{' '}
              <Link
                to={'/register'}
                replace={true}
                className="text-blue-600 hover:underline"
              >
                Register
              </Link>
            </span>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
