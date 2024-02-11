import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import AppLayout from '../components/Layout';
import Page404 from '../pages/Page404';
import NewNote from '../pages/NewNote';
const Home = React.lazy(() => import('../pages/Home'));
const Notes = React.lazy(() => import('../pages/Notes'));
const Hello = React.lazy(() => import('../pages/Hello'));
const About = React.lazy(() => import('../pages/About'));

export default function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <Page404 />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/notes',
          element: <Notes />,
        },
        {
          path: '/notes/new',
          element: <NewNote />,
        },
        {
          path: '/hello',
          element: <Hello />,
        },

        {
          path: '/about',
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
