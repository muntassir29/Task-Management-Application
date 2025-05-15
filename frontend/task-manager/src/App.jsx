import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from './pages/Admin/ManageUsers';

import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskdetails from './pages/User/ViewTaskDetails';

import PrivateRoute from './routes/PrivateRoute';
import UserProvider, { UserContext } from './context/userContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
<UserProvider>
  <div>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />

        {/* Admin Routes protégées */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/tasks' element={<ManageTasks />} />
          <Route path='/admin/create-task' element={<CreateTask />} />
          <Route path='/admin/users' element={<ManageUsers />} />
        </Route>

        {/* User Routes protégées */}
        <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path='/user/dashboard' element={<UserDashboard />} />
          <Route path='/user/tasks' element={<MyTasks />} />
          <Route path='/user/task-details/:id' element={<ViewTaskdetails />} />
        </Route>

        {/* Defaut Route */}
        <Route path='/' element={<Root />} />
      </Routes>
    </Router>
  </div> 

  <Toaster
  toastOptions={{
    className: "",
    style: {
      fontSize: "13px",
    },
  }} />
</UserProvider>    

  );
}

export default App;


// const Root = () => {
//   const { user, loading } = useContext(UserContext);

//   if (loading) return <Outlet />

//   if (!user) {
//     return <Navigate to="/login"/>;
//   }

//   return user.role === "admin" ? <Navigate to="/admin/dashboard"/> : <Navigate to="/user/dashboard"/>;
// };


const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    // Affiche un petit texte ou rien pendant le chargement
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "admin" 
    ? <Navigate to="/admin/dashboard" replace /> 
    : <Navigate to="/user/dashboard" replace />;
};

