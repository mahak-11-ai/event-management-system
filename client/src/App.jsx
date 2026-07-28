import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage';
import ProtectedRoutes from './component/ProtectedRoutes';
import OpenRoutes from './component/OpenRoutes';
import CreateEventPage from "./pages/CreateEventPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<OpenRoutes/>}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        </Route>


     

        {/* accessible when i have token */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          {/* outlet is the child routes  */}
        </Route>
      </Routes>
    </div>
  );
}

export default App