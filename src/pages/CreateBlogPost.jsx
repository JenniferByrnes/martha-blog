import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { v4 } from "uuid";

const CreateBlogPost = () => {

  const [blogPostText, setBlogPostText] = useState('');
  const [blogPostTitle, setBlogPostTitle] = useState('');
  const [userRef, setUserRef] = useState('');

  const [loading, setLoading] = useState(false)

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const [selectedImage, setSelectedImage] = useState();
  // This function will be triggered when the 'file' field changes
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

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

  // Handle file upload event and update state
  // blogImages is the folder where the image will be stored.
  async function storeImage() {
    if (!selectedImage) return;

    return new Promise((resolve, reject) => {
      const storage = getStorage()
      // add characters to the filename to make it unique with v4
      const imageRef = ref(storage, `blogImages/${selectedImage.name + v4()}`);
      // pass in the location and the image
      uploadBytes(imageRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve(url)
          setSelectedImage()
        });
      },
        (err) => {
          toast.error('Image not uploaded')
          reject(err)
        }
      );
    })
  };

  async function handleFormSubmit(e) {
    e.preventDefault()
    try {
      const timestamp = serverTimestamp()
      // Store the image and get the url
      const blogPostImage = await storeImage()

      // Store the record into the collection
      // The names used here are the field names for the collection
      // Await is needed for the storeImage to complete.
      if (blogPostImage) {
      await addDoc(collection(db, 'blog'),
        { blogPostTitle, blogPostText, blogPostImage, userRef, timestamp })
      } else {
        await addDoc(collection(db, 'blog'),
        { blogPostTitle, blogPostText, userRef, timestamp })
      }
      setLoading(false)
      toast.success('BlogPost Added')
      navigate(`/blog`)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    // Container for new blog post
    <section className=" mx-auto min-h-screen h-full w-screen bg-pcGreen">
      <header className="flex justify-center">
      <div className="text-center">
        <h2 className="text-4xl inline border-b-4 border-pcCoral">Create New Post</h2>
      </div>
      </header>
      <main className="flex justify-center">
        {/* Card */}
        <div className="w-full lg:max-w-full lg:flex flex-col md:flex-row md:max-w-xl rounded-2xl bg-white shadow-lg mx-6 my-3 md:p-3 ">
          {/* Input form */}
          <form className="p-3 w-full"
            onSubmit={handleFormSubmit}
          >
            {/* Blog Image container */}
            <div className="col py-3 px-6 " md="auto">
              {/* Image sub container */}
              <div className="form-group mb-6">
                {/* image display and selection */}
                <div className="container pt-5">
                  {/* type file allows user to upload file */}
                  <input
                    accept="image/*"
                    type="file"
                    id='image'
                    className="bg-pcGreen border-pcGreen border-4"
                    onChange={imageChange}
                  />
                  {/* preview selected file */}
                  {selectedImage && (
                    <div className="flex flex-col mt-4 " >
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        className="max-w-100 max-h-96"
                        alt="Thumb"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Next row */}
            <div className="row">
              {/* Blog title */}
              <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium ">Title</label>
                <input
                  type="text"
                  id="blogPostTitle"
                  value={blogPostTitle}
                  className="  border-2 border-pcGreen w-full p-3 mb-4 focus: outline-pcGreen rounded"
                  onChange={handleChangeTitle}
                />
              </div>
            </div>
            {/* Blog Text */}
            <div className="row">
              <div className="form-group mb-6">
                <label htmlFor="text"
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
    </ section>
  );
};

export default CreateBlogPost;