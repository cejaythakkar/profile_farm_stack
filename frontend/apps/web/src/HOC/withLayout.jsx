import Navbar from '../components/Navbar';
import { Footer } from 'shared-component-library';

const withLayout = (WrappedComponent) => {
    
  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="w-full body-container px-5 bg-gray-900 text-white flex-1 flex justify-center">
        <WrappedComponent />
      </div>
      <Footer />
    </div>
  );
};

export default withLayout;
