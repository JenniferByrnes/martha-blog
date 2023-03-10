import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Blog from './pages/Blog'
import EditBlogPost from './pages/EditBlogPost'
import CreateBlogPost from './pages/CreateBlogPost'
import SingleBlogPost from './pages/SingleBlogPost'
import ForgotPassword from './pages/ForgotPassword'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
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
          <Route path='/single-blog-post/:blogPostId' element={<SingleBlogPost />} />
          <Route path='/edit-blog-post/:blogPostId' element={<EditBlogPost />} />
          <Route path='/create-post' element={<CreateBlogPost />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          {/* Nested route to direct based on Auth status */}
          <Route path='/profile' element={<PrivateRoute />}>
            {/* This is the child element used by Outlet in Private Route */}
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/airbnb' element={<Photos />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
