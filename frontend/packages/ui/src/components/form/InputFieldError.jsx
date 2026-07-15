import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

const InputFieldError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      className="text-red-500 mt-1 text-xs italic"
      component={'p'}
    />
  );
};

InputFieldError.propTypes = {
  name: PropTypes.string.isRequired,
};
export default InputFieldError;
