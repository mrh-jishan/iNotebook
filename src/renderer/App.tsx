import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import AppLayout from '../components/Layout';
import Page404 from '../pages/Page404';

const Home = React.lazy(() => import('../pages/Home'));
const Notes = React.lazy(() => import('../pages/Notes'));
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
          path: '/notes/:noteId',
          element: <Notes />,
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
