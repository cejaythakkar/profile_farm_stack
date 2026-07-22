import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PersonalInfo from './pages/PersonalInfo';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import  axiosClient  from './utils/axiosClient';
import MainContextProvider from './context/MainContext';
import ProtectedLayout from './layout/ProtectedLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import MainLayout from './layout/MainLayout';

const checkServerHealth = async () => {
  const response = await axiosClient.get('/health');
  const data = await response.data;
  
};

const App = () => {
  useEffect(() => {
    checkServerHealth();
  }, []);
  return (
    <>
      <MainContextProvider>
        <div className="flex flex-col min-h-screen w-full">
          <Routes>
            <Route Component={MainLayout}>
              <Route Component={ProtectedLayout}>
                <Route path="/" Component={HomePage} />
                <Route
                  path="/:userName/personal-info"
                  Component={PersonalInfo}
                />
                <Route path="/:userName/skills" Component={SkillsPage} />
                <Route path="/:userName/projects" Component={ProjectsPage} />
                <Route
                  path="/:userName/experience"
                  Component={ExperiencePage}
                />
              </Route>
              {/* <Route  path="/" Component={ProtectedLayout}>
                <Route index Component={HomePage} />
              </Route> */}

              {/* <Route  path="/:userName/personal-info" Component={ProtectedLayout}>
                <Route index Component={PersonalInfo} />
                </Route> */}

              <Route path="/login" Component={LoginPage} />
              <Route path="/register" Component={RegisterPage} />
            </Route>

            <Route path="/:userName/profile" Component={ProfilePage} />
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Routes>
        </div>
      </MainContextProvider>
    </>
  );
};

App.propTypes = {};

export default App;
