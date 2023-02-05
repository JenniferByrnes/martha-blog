import { getAuth, updateEmail, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore'
import { getStorage, deleteObject } from 'firebase/storage';

import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import BlogList from '../components/BlogList'
import GetExistingImageRef from '../components/GetExistingImageRef'

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
    navigate(`/`)
  }

  const onSubmit = async () => {
    try {
      auth.currentUser.displayName !== username &&
        (await updateProfile(auth.currentUser, {
          displayName: username
        }));

      auth.currentUser.email !== email &&
        (await updateEmail(auth.currentUser, email));

      const useRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(useRef, {
        username,
        email
      });
    } catch (error) {
      toast.error('Could not update profile details');
    }
    toast.success("Profile updated");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {

      // Get reference
      const blogPostsRef = collection(db, 'blog')

      // Create a query
      const q = query(
        blogPostsRef,
        where('userRef', '==', auth.currentUser.uid),
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
  }, [auth.currentUser.uid])

  const onDelete = async (blogPostId, blogPostData) => {
    if (window.confirm('Are you sure you want to delete?')) {

      // First, delete image from Storage
      const storage = getStorage();

      async function deleteOldImage() {
        const urlToDelete = blogPostData.blogPostImage
        if (urlToDelete) {

          console.log('urlToDelete=');
          console.log(urlToDelete);
          // TODO: Inconsistant in deleting images - the filenames look correct.
          await deleteObject(GetExistingImageRef(urlToDelete, storage))
            .then(() => {
              console.log('Old image deleted');
            })
            .catch((error) => {
              console.error('Failed to delete image', error);
            });

        }
      }

      deleteOldImage();
      // Delete the Firestore blogPost
      await deleteDoc(doc(db, 'blog', blogPostId))
      const updatedBlogPosts = blogPosts.filter(
        (blogPost) => blogPost.id !== blogPostId
      )
      setBlogPosts(updatedBlogPosts)
      toast.success('Successfully deleted post')
    }
  }

  const onEdit = (blogPostId) => navigate(`/edit-blog-post/${blogPostId}`)

  return (
    <section className="mx-auto min-h-screen h-full w-screen bg-pcGreen">
      <div className="text-center p-6 ">
        <h2 className="text-4xl inline border-b-4 border-pcCoral">Admin Only</h2>
      </div>
      <br />
      {/* Divide the container into columns */}
      <div className="flex flex-col md:flex-row md:space-x-10 p-6 " >

        {/* left column */}
        <div className="flex justify-center  ">
          <div className="form-container h-fit">
            <div className="form-inner-container ">
              <button type='button' className="form-button">
                <NavLink
                  to='/create-post'>Create new post
                </NavLink>
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
                    className={!changeDetails ? 'bg-pcGreen' : 'border-8 border-double border-pcGreen'}
                    disabled={!changeDetails}
                    value={username}
                    onChange={onChange}
                  />
                  <label htmlFor="email" className="block text-sm font-medium ">Your email</label>
                  <input type="email"
                    id='email'
                    className={!changeDetails ? 'bg-pcGreen' : 'border-8 border-double border-pcGreen'}
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
            <ul className="justify-space-between ">
              {blogPosts.map((blogPost) => (
                <BlogList
                  key={blogPost.id}
                  blogPost={blogPost.data}
                  id={blogPost.id}
                  onDelete={() => onDelete(blogPost.id, blogPost.data)}
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