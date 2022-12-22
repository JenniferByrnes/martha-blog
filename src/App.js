import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Blog from './pages/Blog'
import EditBlog from './pages/EditBlog'
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login'
import Home from './pages/Home'
import Photos from './pages/Photos'
import SignUp from './pages/SignUp'

import Navbar from './components/Navbar'

function App() {
  return (
    <>

      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/edit-blog' element={<EditBlog />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/photos' element={<Photos />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
