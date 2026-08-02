import React from 'react';
import DynamicForm from '../../components/DynamicForm';
import { FormSpinner, FormComponents } from 'shared-component-library';
import { useFormikContext } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { setFormSubmit } from '../../store/uiSlice';
import axiosClient from '../../utils/axiosClient';
import { toast } from 'react-toastify';

const initialData = {
  title: [],
  summary: '',
};
const Form = () => {
  const { values, setFieldValue } = useFormikContext();
  return (
    <>
      <div className="w-full px-3 mb-3">
        <FormComponents.MultilineChipInput
          name="title"
          text="Title"
          required={true}
          value={values.title}
          setValue={setFieldValue}
        />
      </div>
      <div className="w-full px-3 mb-3  flex-1 flex flex-col">
        <FormComponents.FormikRichTextEditor
          name="summary"
          text="Summary"
          defaultValue={values.summary}
        />
      </div>
    </>
  );
};
const CareerHighlights = () => {
  const dispatch = useDispatch();
  const dataLoading = useSelector((state) => state.ui.dataLoading);
  console.log('dataLoading', dataLoading);
  return (
    <DynamicForm
      initialValues={initialData}
      showActionButtons={true}
      mainContentClasses="max-h-[500px]"
      validationSchema={yup.object().shape({})}
      submitHandler={async (values) => {
        dispatch(setFormSubmit(true));
        const response = await axiosClient.post('/career-highlights', values);
        if (response.status == 200) {
          toast.success('Career Highlights updated Successfully!');
        } else {
          toast.error('Something went wrong while updating Career Highlights!');
        }

        dispatch(setFormSubmit(false));
      }}
    >
      <Form />
    </DynamicForm>
  );
};

export default CareerHighlights;
