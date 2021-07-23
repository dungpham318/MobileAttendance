import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import Login from './components/login/Login'
import UserList from './components/user/UserList'
import RoomList from './components/room/RoomList'
import TermList from './components/term/TermList'
import SubjectList from './components/subject/SubjectList'
import CourseList from './components/course/CourseList'
import SessionList from './components/session/SessionList'
const routes = [
  {
    path: 'mbAttendance/admin',
    element: <DashboardLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'users', element: <UserList /> },
      { path: 'rooms', element: <RoomList /> },
      { path: 'terms', element: <TermList /> },
      { path: 'subjects', element: <SubjectList /> },
      { path: 'courses', element: <CourseList /> },
      { path: 'sessions', element: <SessionList /> },
      // { path: 'account', element: <AccountView /> },
      // { path: 'customers', element: <CustomerListView /> },
      // { path: 'dashboard', element: <DashboardContainer /> },
      // { path: 'popup', element: <PopupListContainer /> },
      // { path: 'application', element: <ApplicationListContainer /> },
      // { path: 'settings', element: <SettingsView /> },
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'mbAttendance',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      // { path: 'register', element: <RegisterView /> },
      // { path: '404', element: <NotFoundView /> },
      // { path: '/', element: <Navigate to="/app/dashboard" /> },
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
