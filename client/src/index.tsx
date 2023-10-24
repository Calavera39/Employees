import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Paths } from './paths';
import { Router } from 'express';
import Register from './paths/register';
import Login from './paths/login';
import {ConfigProvider, theme} from 'antd'
import { store } from './components/app/store';
import { Auth } from './components/app/feature/auth/auth';
import { Employees } from './paths/employees';
import { AddEmployee } from './paths/add-empoyee';
import { Status } from './paths/status';
import { Employee } from './paths/employee';
import { EmployeeEdit } from './paths/edit-employee';

const container = document.getElementById('root')!;
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />
  },
  {
    path: Paths.login,
    element: <Login />
  },
  {
    path: Paths.register,
    element: <Register />
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EmployeeEdit />
  },
])


root.render(
 
    
    
    <Provider store={store}>
        <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
        <Auth>
          <RouterProvider router={router}/>
        </Auth>
      </ConfigProvider>
    </Provider>
  
  
  
);


