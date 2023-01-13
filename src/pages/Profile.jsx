import { getAuth, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  deleteDoc
} from 'firebase/firestore'

import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import BlogList from '../components/BlogList'

export default function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { username, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  // TODO - this does not update the email.  Needs to happen in auth and Firestore db
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== username) {
        //Update display name in Firebase
        await updateProfile(auth.currentUser, {
          displayName: username
        })
        // Update in Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          username: username
        })

      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  useEffect(() => {
    const fetchBlogPosts = async () => {

      // Get reference
      const blogPostsRef = collection(db, 'blog')

      // Create a query
      const q = query(
        blogPostsRef,
        orderBy('timestamp', 'desc')
      )

      // Execute query
      const querySnap = await getDocs(q)

      const blogPosts = []

      querySnap.forEach((doc) => {
        return blogPosts.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setBlogPosts(blogPosts)
      setLoading(false)
    }

    fetchBlogPosts()
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onDelete = async (blogPostId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'blog', blogPostId))
      const updatedBlogPost = blogPosts.filter(
        (blogPost) => blogPost.id !== blogPostId
      )
      setBlogPosts(updatedBlogPost)
      toast.success('Successfully deleted post')
    }
  }

  const onEdit = (blogPostId) => navigate(`/edit-blog-post/${blogPostId}`)

  return (
    <section className="container mx-auto p-6 ">
      <h1 className="flex items-center mb-6 text-3xl border-b-4 border-pcCoral">
        <p>Admin Use Only</p>

      </h1>
      <br />
      {/* Divide the container into columns */}
      <div className="flex flex-col md:flex-row md:space-x-10" >

        {/* left column */}
        <div
          className="flex justify-center  "
        >
          <div className="form-container ">
            <div className="form-inner-container ">
            <button type='button' className="form-button">  
                  <Link
                to='/create-post'>Create new post
              </Link>
              </button>
              <br />
              <button type='button' className="form-button"
                  onClick={onLogout}>  Logout </button>
              <h1 className="text-2xl">Personal Details</h1>
              <div>
                <form className="space-y-2 md:space-y-4 " action="">
                  <label htmlFor="username" className="block text-sm font-medium ">Your username</label>
                  {/* Make text appear changeable when available */}
                  <input type="text"
                    id='username'
                    className={!changeDetails ? 'bg-pcGreen' : ''}
                    disabled={!changeDetails}
                    value={username}
                    onChange={onChange}
                  />
                  <label htmlFor="email" className="block text-sm font-medium ">Your email</label>
                  <input type="email"
                    id='email'
                    className='bg-pcGreen mb-20'
                    disabled={!changeDetails}
                    value={email}
                    onChange={onChange}
                  />
                  {/* This must not be a button or type "submit" - causes a re-render */}
                  <p className="form-button" onClick={() => {
                    changeDetails && onSubmit()
                    setChangeDetails((prevState) => !prevState)
                  }}>
                    {changeDetails ? 'Save' : 'Update'}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Right section of container */}
        {!loading && blogPosts?.length > 0 && (
          <div className="flex-grow">
            <ul  className="justify-space-between ">
              {blogPosts.map((blogPost) => (
                <BlogList
                  key={blogPost.id}
                  blogPost={blogPost.data}
                  id={blogPost.id}
                  onDelete={() => onDelete(blogPost.id)}
                  onEdit={() => onEdit(blogPost.id)}
                />
              ))}

            </ul>
          </div>
        )}
      </div>
    </section>
  )
}