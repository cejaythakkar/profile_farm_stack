import { Header } from 'shared-component-library';
import { useMainContext } from '../context/MainContext';

const Navbar = () => {
  const { user,logoutHandler } = useMainContext();
  const navItems = [
    {
      linkProps: { to: `/${user.userName}/personal-info` },
      key: `/${user.userName}/personal-info`,
      text: 'Personal Details',
      show: user['_id'],
    },
    {
      linkProps: { to: `/${user.userName}/skills` },
      key: `/${user.userName}/skills`,
      text: 'Skills',
      show: user['_id'],
    },
    {
      linkProps: { to: `/${user.userName}/experience` },
      key: `/${user.userName}/experience`,
      text: 'Professional Experience',
      show: user['_id'],
    },
    {
      linkProps: { to: `/${user.userName}/Projects` },
      key: `/${user.userName}/Projects`,
      text: 'Projects',
      show: user['_id'],
    },
    {
      linkProps: {
        to: `/register`,
        replace: true,
      },
      key: '/register',
      text: 'Register',
      show: !user['_id'],
    },
    {
      linkProps: {
        to: `/login`,
        replace: true,
      },
      key: '/login',
      text: 'Login',
      show: !user['_id'],
    },
  ];
  return <Header navItems={navItems} user={user['_id']} logoutHandler={logoutHandler} />;
};

export default Navbar;
