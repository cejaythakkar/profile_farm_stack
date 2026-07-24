import { FormComponents, FormSpinner } from 'shared-component-library';
import { Form, Formik, FieldArray } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import DynamicList from '../../components/DynamicList';
import FormSection from '../../components/FormSection';
import { ProfileImage } from '../../../../../packages/ui/src/components';
import { DYNAMIC_LIST_TYPE } from '../../constants';
import  axiosClient from '../../utils/axiosClient';
import { fetchData as getData } from '../../utils/api';
import { useEffect, useState } from 'react';

const phoneRegExp = /^\+?[1-9]\d{1,14}$/;

const personalDetailsSchema = yup.object({
  name: yup.string().required('Name cannot be empty'),
  email: yup.string().required('Email cannot be empty'),
  address: yup
    .string()
    .min(10, 'Address must be at least 10 characters long')
    .required('Address cannot be empty'),
  dob: yup.string().required('Date of Birth cannot be empty'),
  contactDetails: yup.array().of(
    yup.object({
      number: yup
        .string()
        .required('Number cannot be empty')
        .matches(phoneRegExp, 'Invalid Phone number'),
      type: yup.string().required('Type of Contact is Required'),
    }),
  ),
  hobbles: yup.array().of(
    yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
  languagesKnown: yup.array().of(
    yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
  nationality: yup.string().required('Nationality cannot be empty'),
  socialMedia: yup.array().of(
    yup.object({
      type: yup.string(),
      link: yup.string(),
    }),
  ),
});

const defaultValues = {
  name: '',
  nationality: '',
  email: '',
  address: '',
  dob: '',
  hobbies: [],
  languagesKnown: [],
  contactDetails: [
    {
      type: '',
      number: '',
    },
  ],
  profileImage: null,
  socialMedia: [
    {
      type: '',
      link: '',
    },
  ],
};

const PersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getData({ url: '/personal-info' });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setLoading(false);
      setInitialValues(data);
    };
    fetchData();
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={personalDetailsSchema}
      onSubmit={async (values) => {
        setLoading(true);
        const formData = new FormData();
        const profileImage = values['profileImage'];
        delete values['profileImage'];
        formData.append('personalDetails', JSON.stringify(values));
        profileImage &&
          typeof profileImage != 'string' &&
          formData.append('profileImage', profileImage);
        // for (let key of Object.keys(values)){
        //   formData.append(key,values[key])
        // }
        await axiosClient.post('/personal-info', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success('Personal Details Updated Successfully!');
        setLoading(false);
      }}
    >
      {({ values, setFieldValue }) => (
        <div className="personal-details-wrapper flex w-[80%] flex justify-center items-center">
          <Form className="w-full h-[600px] flex-col items-center justify-center relative">
            {loading && <FormSpinner />}
            <div className="h-[90%] flex bg-black/25 border border-gray-500 shadow flex-col  overflow-auto px-5 py-5">
              <div className="w-full">
                <FormSection title="General Details">
                  <div className="flex flex-wrap -mx-3 my-3">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex items-center justify-center">
                      <ProfileImage
                        name="profileImage"
                        userName="Jay Thakkar"
                        setFieldValue={setFieldValue}
                        profileImageURL={values.profileImage}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <FormComponents.Input
                        name="name"
                        text="Name"
                        type="text"
                        required
                        placeholder="Enter Full Name"
                      />
                      <FormComponents.DatePicker
                        selectedDate={values.dob}
                        setSelectedDate={setFieldValue}
                        name="dob"
                        text="Date of Birth"
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <FormComponents.Input
                        name="email"
                        text="Email"
                        type={'email'}
                        placeholder="Enter Your Email"
                        required
                      />
                      <FormComponents.Input
                        name="nationality"
                        text="Nationality"
                        type={'text'}
                        placeholder="Enter Your Nationality"
                        required
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <FormComponents.Textarea
                        name="address"
                        text="Address"
                        required
                      />
                    </div>

                    <div className="w-full px-3 mb-3">
                      <FormComponents.ChipInput
                        name="languagesKnown"
                        text="Languages Known"
                        value={values.languagesKnown}
                        setValue={setFieldValue}
                      />
                    </div>
                  </div>
                </FormSection>
                <FieldArray name="contactDetails">
                  {({ insert, remove, push }) => (
                    <FormSection
                      title="Contact Details"
                      remove={remove}
                      push={push}
                      addButtonText="Add Contact"
                    >
                      <div className="mt-3 w-full">
                        {values.contactDetails.length > 0 &&
                          values.contactDetails.map((contactInfo, index) => (
                            <DynamicList
                              index={index}
                              remove={remove}
                              uniqueId={`contactDetails.${index}`}
                              data={contactInfo}
                              key={index}
                              type={DYNAMIC_LIST_TYPE.CONTACT_INFO}
                              required={index == 0}
                            />
                          ))}
                      </div>
                      
                    </FormSection>
                  )}
                </FieldArray>
                <FormSection title="Hobbies">
                  <div className="flex flex-wrap -mx-3 my-3">
                    <div className="w-full px-3 mb-3">
                      <FormComponents.ChipInput
                        name="hobbies"
                        text="What are you passionate about apart from coding?"
                        value={values.hobbies}
                        setValue={setFieldValue}
                      />
                    </div>
                  </div>
                </FormSection>
                <FieldArray name="socialMedia">
                  {({ insert, remove, push }) => (
                    <FormSection
                      title="Social Media"
                      remove={remove}
                      push={push}
                      addButtonText="Add Social"
                    >
                      <div className="mt-3 w-full">
                        {values.socialMedia.length > 0 &&
                          values.socialMedia.map((social, index) => (
                            <DynamicList
                              index={index}
                              remove={remove}
                              uniqueId={`socialMedia.${index}`}
                              data={social}
                              key={index}
                              type={DYNAMIC_LIST_TYPE.SOCIAL_MEDIA}
                            />
                          ))}
                      </div>
                    </FormSection>
                  )}
                </FieldArray>
              </div>
            </div>
            <div className="h-[10%] footer bg-gray-500 flex justify-end gap-x-4 box-border px-5 items-center">
              <FormComponents.Button text="Cancel" disabled={loading} />
              {/* <FormComponents.Button text="Update" type="submit" /> */}
              <FormComponents.ButtonWithSpinner
                text="Update"
                type="submit"
                disabled={loading}
                loading={loading}
              />
              {/* <button text="Update" type="submit">submit</button> */}
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default PersonalInfo;
