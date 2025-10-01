import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Puzzle from '@/components/Puzzle'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import Form from '@/components/Form'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

const base = import.meta.env.BASE_URL;
console.log(base);

const router = createBrowserRouter([
  { path: base+"", element: <Home /> },
  { path: base+"puzzle", element: <Puzzle /> },
  { path: base+"puzzle/:id", element: <Puzzle /> },
  { path: base+"upload", element: <Form /> },
  { path: "*", element: <NotFound/> },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
