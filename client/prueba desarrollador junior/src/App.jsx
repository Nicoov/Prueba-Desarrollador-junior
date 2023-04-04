
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/home';
import { Editar } from './pages/Editar';
import './App.css'
import { Auth } from './context/auth';
import { ProtectedRoutes } from './components/ProtectedRoutes';



function App() {



  return (
    <BrowserRouter>
      <Auth>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registro' element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/inicio' element={<Home />} />
            <Route path='/editar/:id' element={<Editar />} />
          </Route>
        </Routes>
      </Auth>
    </BrowserRouter>
  )
}

export default App
