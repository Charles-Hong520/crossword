import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import Puzzle from '@/components/Puzzle'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import Form from '@/components/Form'
import Layout from '@/components/Layout'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PuzzleList from '@/components/PuzzleList';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/puzzle", element: <PuzzleList /> },
      { path: "/puzzle/:puzzle_number", element: <Puzzle /> },
      { path: "/upload", element: <Form /> },
      { path: "*", element: <NotFound /> },
    ]
  },
  { path: "/", element: <Home />},
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
