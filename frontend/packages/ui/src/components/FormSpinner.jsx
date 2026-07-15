import React from 'react';
import { Oval } from 'react-loader-spinner';

const FormSpinner = () => {
  return (
    <div className="w-full h-[90%] absolute bg-white/35 flex items-center justify-center z-2 top-0 left-0">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#2b6cb0"
        secondaryColor="#bfdbfe"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default FormSpinner;
