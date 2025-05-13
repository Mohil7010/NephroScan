// App.js
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import SApp from './Scroll-to-section';
import UploadSection from "./Section3";
import ResultPage from "./ResultPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ProfilePage from './ProfilePage';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/register" replace />;
};

function App() {
  return (
    <div className='app-body'>
      <Routes>
        <Route path="/" element={<SApp />} />
        <Route path="/upload" element={<UploadSection />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
