import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import HomePage from './pages/home';
import StoredPage from './pages/stored';

const App : React.FC = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/stored",
      element: <StoredPage/>,
    },
  ]);

  return (
      <RouterProvider router={router} />
  )
}

export default App
