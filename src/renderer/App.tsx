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
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  // icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

export default function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <AppLayout menuItems={items} />,
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
