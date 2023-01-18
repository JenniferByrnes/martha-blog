import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { v4 } from "uuid";

const CreateBlogPost = () => {

  const [blogPostText, setBlogPostText] = useState('');
  const [blogPostTitle, setBlogPostTitle] = useState('');
  const [blogPostImage1, setBlogPostImage] = useState('');
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
    console.log("***********in storeImage()************")
    if (!selectedImage) return;

    return new Promise((resolve, reject) => {
      const storage = getStorage()
      // add characters to the filename to make it unique with v4
      const imageRef = ref(storage, `blogImages/${selectedImage.name + v4()}`);
      // pass in the location and the image
      uploadBytesResumable(imageRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("*********** 1st getDownloadURL ************")
          resolve(url)
          setBlogPostImage(url)
          setSelectedImage()
          console.log('blogPostImage=')
          console.log(blogPostImage1)
          console.log('url=')
          console.log(url)
          console.log('imageRef=')
          console.log(imageRef)
        });
      },
        (err) => {
          toast.error('Image not uploaded')
          reject(err)
        },
        (url) => {
          // download url
          getDownloadURL(uploadBytesResumable.snapshot.ref).then((url) => {
            console.log("*********** 2nd getDownloadURL ************")
            console.log('File available at ', url);
            console.log('blogPostImage=')
            console.log(blogPostImage1)
            console.log('url=')
            console.log(url)
          });
        });
    })
  };

  async function handleFormSubmit(e) {
    e.preventDefault()
    try {

      
      // setBlogPostImage(await storeImage())
      // console.log('2blogPostImage=')
      // console.log(blogPostImage)
      // console.log(blogPostTitle, blogPostText,
      //   blogPostImage)
        
        const timestamp = serverTimestamp()
        const blogPostImage = await storeImage()
        
        // console.log("handleformsubmit")
        // console.log('1blogPostImage=')
        //  console.log(image)
        
      const docRef = await addDoc(collection(db, 'blog'),
        { blogPostTitle, blogPostText, blogPostImage, userRef, timestamp })
      setLoading(false)
      toast.success('BlogPost Added')
      navigate(`/blog`)
    } catch (err) {
      console.log(err)
    }
  };
  console.log(blogPostImage1)

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
                  {/* 'Save file' must be a div - not a button. */}
                  {/* <div
                    onClick={storeImage}
                  // className="hidden"
                  > Save file.</div> */}
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
                  {/* save selected file to Firebase*/}
                </div>
              </div>
            </div>
            {/* Next row */}
            <div className="row">
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
            {/* Blog Text */}
            <div className="row">
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