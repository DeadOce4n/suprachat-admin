import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Page } from './types/interfaces'

import Home from './pages/Home'
import Users from './pages/Users'

const pages: Array<Page> = [
  { title: 'Inicio', href: '/', element: <Home /> },
  { title: 'Usuarios', href: '/usuarios', element: <Users /> }
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
        <BrowserRouter>
          <Layout pages={pages}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/usuarios' element={<Users />} />
            </Routes>
          </Layout>
        </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
