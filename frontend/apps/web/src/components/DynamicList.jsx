import { FormComponents } from 'shared-component-library';
import { FaTimes } from 'react-icons/fa';
import { FIELDS_OF_DYNAMIC_LIST } from '../constants';

const DynamicList = ({
  index,
  remove,
  uniqueId,
  data,
  type,
  required = false,
}) => {
  const fieldsList = FIELDS_OF_DYNAMIC_LIST[type];
  const [field1, field2] = Object.keys(fieldsList);
  return (
    <div className="flex w-full gapx-4">
      <div className="flex w-full gap-x-4">
        <div className="w-full">
          {' '}
          <FormComponents.Input
            name={`${uniqueId}.${field1}`}
            type={fieldsList[field1].type}
            text={fieldsList[field1].text}
            required={required}
            placeholder={fieldsList[field1].placeholder}
          />
        </div>
        <div className="w-full">
          <FormComponents.Input
            name={`${uniqueId}.${field2}`}
            type={fieldsList[field2].type}
            text={fieldsList[field2].text}
            required={required}
            placeholder={
              data.type != ''
                ? `Enter ${data.type} ${fieldsList[field2].placeholder}`
                : `Enter ${fieldsList[field2].placeholder}`
            }
          />
        </div>
      </div>
      {
        <div
          className={`flex items-start py-1 ml-3 ${required ? 'invisible' : ''}`}
        >
          <button
            className={`text-red-500 cursor-pointer`}
            onClick={() => {
              remove(index);
            }}
          >
            <FaTimes />
          </button>
        </div>
      }
    </div>
  );
};

export default DynamicList;
