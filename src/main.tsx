import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import About from './pages/About'
import NotFound from './components/NotFound'
import Layout from './components/Layout'

let router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/about',
        element: <About />
      },
    ]
  },
])

const rootElement = document.getElementById('root')

if(rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    ) 
}

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
    
//   </StrictMode>,
// )
