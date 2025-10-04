import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import Puzzle from '@/components/Puzzle'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import Form from '@/components/Form'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/puzzle", element: <Puzzle /> },
  { path: "/puzzle/:puzzle_number", element: <Puzzle /> },
  { path: "/upload", element: <Form /> },
  { path: "*", element: <NotFound /> },
], { basename: import.meta.env.BASE_URL });


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
