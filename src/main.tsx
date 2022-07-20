import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  ThemeConfig
} from '@chakra-ui/react'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { Page } from './types/interfaces'

import Home from './pages/Home'
import Users from './pages/Users'
import Login from './pages/Login'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config })

const pages: Array<Page> = [
  { title: 'Inicio', href: '/', element: <Home /> },
  { title: 'Usuarios', href: '/usuarios', element: <Users /> }
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
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
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
