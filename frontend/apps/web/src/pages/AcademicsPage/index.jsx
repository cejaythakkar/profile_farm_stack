import { useEffect } from 'react';
import DynamicForm from '../../components/DynamicForm';
import { FormSpinner, FormComponents } from 'shared-component-library';
import { useFormikContext, FieldArray } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { setFormSubmit } from '../../store/uiSlice';
import axiosClient from '../../utils/axiosClient';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import FormSection from '../../components/FormSection';
import { fetchAcademicsData } from '../../store/academicsSlice';

const academicsObj = {
  year: '',
  course: '',
  grades: '',
  college: '',
  collegeUrl: '',
  university: '',
};
const initialData = { academics: [] };
const Form = ({ remove }) => {
  const { values, setFieldValue } = useFormikContext();

  return values.academics.map((item, index) => {
    return (
      <>
        <div className={`flex flex-col py-1 ml-3 items-end`}>
          <button
            className={`text-red-500 cursor-pointer`}
            onClick={() => {
              remove(index);
            }}
          >
            <FaTimes />
          </button>
        </div>
        <div className="w-full flex mb-3 gap-x-4">
          <FormComponents.Input
            name={`academics.${index}.year`}
            text="Year"
            required={true}
          />
          <FormComponents.Input
            name={`academics.${index}.course`}
            text="Course"
            required={true}
            containerClasses="flex-1"
          />
          <FormComponents.Input
            name={`academics.${index}.grades`}
            text="Grades"
            required={true}
          />
        </div>
        <div className="w-full flex mb-3 gap-x-4">
          <FormComponents.Input
            name={`academics.${index}.college`}
            text="College / School"
            required={true}
          />
          <FormComponents.Input
            name={`academics.${index}.collegeUrl`}
            text="College / School Website"
            required={true}
            containerClasses="flex-1"
          />
          <FormComponents.Input
            name={`academics.${index}.university`}
            text="University / Board"
            required={true}
          />
        </div>
      </>
    );
  });
};
const Academics = () => {
  const dispatch = useDispatch();
  const dataLoading = useSelector((state) => state.ui.dataLoading);
  const formSubmit = useSelector((state) => state.ui.formSubmit);
  const academics = useSelector((state) => state.academics.academicsData);
  ;

  useEffect(() => {
    dispatch(fetchAcademicsData());
  }, [dispatch]);
  return (
    <DynamicForm
      initialValues={academics}
      showActionButtons={true}
      mainContentClasses="max-h-[500px]"
      validationSchema={yup.object().shape({})}
      submitHandler={async (values) => {
        dispatch(setFormSubmit(true));
        const response = await axiosClient.post('/academics', values);
        if (response.status == 200) {
          toast.success('Career Highlights updated Successfully!');
        } else {
          toast.error('Something went wrong while updating Career Highlights!');
        }

        dispatch(setFormSubmit(false));
      }}
    >
      {(dataLoading || formSubmit) && <FormSpinner />}
      <FieldArray name="academics">
        {({ push, remove }) => (
          <FormSection
            addButtonText="Add Academics"
            title={'Academics'}
            push={true}
            addButtonClickHandler={() => push({ ...academicsObj })}
          >
            <div className="my-3">
              <Form remove={remove} />
            </div>
          </FormSection>
        )}
      </FieldArray>
    </DynamicForm>
  );
};

export default Academics;
