import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { Page } from './types/interfaces'

import Home from './pages/Home'
import Users from './pages/Users'
import Login from './pages/Login'

const pages: Array<Page> = [
  { title: 'Inicio', href: '/', element: <Home /> },
  { title: 'Usuarios', href: '/usuarios', element: <Users /> }
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout pages={pages} />}>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='/usuarios'
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
