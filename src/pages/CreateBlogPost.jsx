import React, { useState, useEffect, useRef } from 'react';
import BlogImage from '../components/BlogImage';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

const CreateBlogPost = () => {
  console.log("in CREATE BLOG POST")
  const [blogPostText, setBlogPostText] = useState('');
  const [blogPostTitle, setBlogPostTitle] = useState('');
  const [blogPostImage, setBlogPostImage] = useState('');
  const [userRef, setUserRef] = useState('');

  const [loading, setLoading] = useState(false)

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const handleImage = savedURL => {
    console.log('handleImage=', savedURL, ' done')
    setBlogPostImage(savedURL);
  }

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserRef(user.uid)
        } else {
          navigate('/login')
        }
      })
    }
    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  if (loading) {
    return <Spinner />
  }

  const handleChangeText = event => {
    setBlogPostText(event.target.value);
  };

  const handleChangeTitle = event => {
    setBlogPostTitle(event.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault()
    console.log("handleformsubmit")
    console.log(    blogPostTitle, blogPostText,
    blogPostImage)

    const timestamp = serverTimestamp()

    const docRef = addDoc(collection(db, 'blog'),
    {blogPostTitle, blogPostText, blogPostImage, userRef, timestamp})
    setLoading(false)
    toast.success('BlogPost Added')
    navigate(`/blog`)
  };

  return (
    // Container for new blog post
    <>
      <header className="flex justify-center">
        <p>Create a BlogPost</p>
      </header>
      <main className="flex justify-center">
        {/* Card */}
        <div className="w-full lg:max-w-full lg:flex flex-col md:flex-row md:max-w-xl rounded-2xl bg-white shadow-lg mx-6 my-3 md:p-3 ">
          {/* Input form */}
          <form className="p-3 w-full"
            onSubmit={handleFormSubmit}
          >
            {/* Image container */}
            <div className="col py-3 px-6 " md="auto">
              {/* Image sub container */}
              <div className="form-group mb-6">
                <BlogImage handleImage={handleImage} />
              </div>
            </div>
            {/* Next row */}
            <div classname="row">
              {/* Blog title */}
              <div className="mb-6">
                <label for="title" className="block mb-2 text-sm font-medium ">Title</label>
                <input 
                type="text" 
                id="blogPostTitle" 
                value={blogPostTitle}
                className="  border-2 border-pcGreen w-full p-3 mb-4 focus: outline-pcGreen rounded"
                  onChange={handleChangeTitle}
                />
              </div>
            </div>
            {/* This is the blog text */}
            <div classname="row">
              <div className="form-group mb-6">
                <label for="text"
                  className="block mb-2 text-sm font-medium ">Content</label>
                <textarea className="block      
                  w-full
                  bg-clip-padding
                  border-2 border-pcGreen p-3 mb-4 
                  focus: outline-pcGreen
                  rounded "
                  id="blogPostText"
                  value={blogPostText}
                  rows="5"
                  onChange={handleChangeText}
                />
              </div>
            </div>
            {/* This is the submit button */}
            <div className="flex justify-center">
              <button type="submit" className="form-button max-w-fit px-4">Submit</button>
            </div>
          </form>
        </div >
      </main>

    </ >
  );
};

export default CreateBlogPost;