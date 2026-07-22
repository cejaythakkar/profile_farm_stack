import { Form, Formik } from 'formik';
import { FormSpinner, FormComponents } from 'shared-component-library';

const DynamicForm = ({
  innerRef,
  children,
  initialValues = {},
  validationSchema = {},
  submitHandler = () => {},
  loading = false,
  widthFull = false,
  showActionButtons = true,
  modalForm = true,
}) => {
  return (
    <Formik
      innerRef={innerRef}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      <div
        className={`personal-details-wrapper flex flex justify-center items-center ${widthFull ? 'w-full' : 'w-[80%]'}`}
      >
        <Form
          className={`${modalForm ? '' : 'h-[600px] '}w-full flex-col items-center justify-center relative`}
        >
          {loading && <FormSpinner />}
          <div
            className={`${showActionButtons ? 'h-[80%]' : 'h-full'} flex border bg-gray-900 border-gray-500 shadow flex-col  overflow-auto px-5 py-5`}
          >
            {children}
          </div>
          {showActionButtons && (
            <div className="h-[10%] footer bg-gray-500 flex justify-end gap-x-4 box-border px-5 items-center">
              {/* <FormComponents.Button text="Update" type="submit" /> */}
              <FormComponents.ButtonWithSpinner
                text="Update"
                type="submit"
                disabled={loading}
                loading={loading}
              />
            </div>
          )}
        </Form>
      </div>
    </Formik>
  );
};

export default DynamicForm;
