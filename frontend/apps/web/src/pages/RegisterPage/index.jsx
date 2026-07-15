import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { axiosClient } from '../../utils/axiosClient';
import { toast } from 'react-toastify';
import { useMainContext } from '../../context/MainContext';
import { FormComponents } from 'shared-component-library';
const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchProfile } = useMainContext();
  const validationSchema = yup.object({
    name: yup.string().required('Name is Required'),
    userName: yup.string().required('User Name is Required'),
    email: yup
      .string()
      .email('Email must be valid')
      .required('Email is Required'),
    password: yup.string().required('Password is Required'),
    confirmPassword: yup.string().required('Confirm Password is Required'),
  });
  const initialValue = {
    name: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmithandler = async (values, helpers) => {
    try {
      setIsLoading(true);
      const response = await axiosClient.post('/auth/register', values);
      const data = await response.data;
      toast.success(data.message);
      localStorage.setItem('token', data.token || '');
      await fetchProfile();
      navigate('/', { replace: true });
      helpers.resetForm();
    } catch (e) {
      toast.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-1 justify-center items-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValue}
        onSubmit={onSubmithandler}
      >
        <Form className="w-[96%] mx-auto lg:w-1/2 py-10 px-8 bg-black/25 border border-gray-500 rounded-xl shadow">
          <FormComponents.Input text="Name" name="name" type="text" required />
          <FormComponents.Input
            text="Email Address"
            name="email"
            type="email"
            required
          />
          <FormComponents.Input
            text="User Name"
            name="userName"
            type="text"
            required
          />
          <FormComponents.PasswordInput
            text="Password"
            name="password"
            required
            placeholder="Enter Your Password"
          />
          <div className="mt-9">
            <button
              type="submit"
              disabled={isLoading ? true : false}
              className="w-full p-3
          flex justify-center items-center bg-blue-600 cursor-pointer disabled:cursor-no-drop disabled:bg-blue-500 border-none rounded hover:bg-blue-700 transition-all duration-300 gap-x-1 "
            >
              <span>Register</span>
              {isLoading ? (
                <CgSpinner className="animate-spin text-xl text-white" />
              ) : (
                <FaArrowRight className="text-sm" />
              )}
            </button>
          </div>
          <div className="mt-3 flex justify-end">
            <span>
              Already have and account?{' '}
              <Link
                to={'/login'}
                replace={true}
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
            </span>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
