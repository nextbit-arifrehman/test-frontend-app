import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './layout/MainLayout';
import App from './App';
import UserDetails from './Component/UserDetails';
import UpdateUser from './Component/UpdateUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
    {index: true ,Component: App},
    { path:'users/:id',
      loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
      Component: UserDetails},
      
      {path:'/update/:id',
      loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`)
        ,
      Component: UpdateUser
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
