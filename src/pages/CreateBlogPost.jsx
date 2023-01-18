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
  const [blogPostImage, setBlogPostImage] = useState('');
  const [userRef, setUserRef] = useState('');

  const [loading, setLoading] = useState(false)

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageName, setSelectedImageName] = useState();

  // Only Auth users should be on this page.
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

  // This function will be triggered when the 'file' field changes
  const imageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
      setSelectedImageName(event.target.files[0].name)
      console.log("****** INSIDE IF STATEMENT*****")

      console.log("JKB imageChange event.target.files[0].name=")
      console.log(event.target.files[0].name)
      console.log("JKB imageChange event.target.value=")
      console.log(event.target.value)

      console.log("JKB imageChange selectedImage=")
      console.log(selectedImage)
      console.log("JKB imageChange selectedImageName=")
      console.log(selectedImageName)

      setSelectedImageName("fred")
      console.log("JKB imageChange selectedImageNamevalue=")
      console.log(selectedImageName)
    }
  };

  // Handle file upload event and update state
  // blogImages is the folder where the image will be stored.
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    console.log("JKB handleformsubmit")

    const storeImage = (selectedImageObj) => {
      console.log("**** IN storeImage ****")
      console.log("JKB selectedImage=")
      console.log(selectedImageObj)
      if (selectedImageObj.name) {

        return new Promise((resolve, reject) => {

          const storage = getStorage()

          // add characters to the filename to make it unique with v4
          const imageRef = ref(storage, `blogImages/${selectedImageObj.name + v4()}`);
          console.log("JKB imageRef=")
          console.log(imageRef)
          // pass in the location and the image
          const uploadTask = uploadBytesResumable(imageRef, selectedImageObj)

          // Code from Firebase Storage docs
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log('Upload is ' + progress + '% done')
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused')
                  break
                case 'running':
                  console.log('Upload is running')
                  break
                default:
                  break
              }
            },
            (error) => {
              reject(error)
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                resolve(url)
                setSelectedImage('')
              });

            },
            (err) => {
              reject(err)
            },
          );
        })
      }
    };

    const imgUrl = await new Promise((image) => storeImage(image))
      .catch(() => {
        setLoading(false)
        toast.error('Image not uploaded')
        return
      })

    console.log("**** JKB check it out *****")
    console.log(blogPostTitle, blogPostText,
      blogPostImage, imgUrl)

    const timestamp = serverTimestamp()

    const docRef = addDoc(collection(db, 'blog'),
      { blogPostTitle, blogPostText, blogPostImage, userRef, timestamp })
    setLoading(false)
    toast.success('BlogPost Added')
    navigate(`/edit-blog-post/${docRef.id}`)
  };


  return (
    // Container for new blog post
    <>
      <header className="text-center">
        <h2 className="text-4xl inline border-b-4 border-pcCoral">Add a post</h2>
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

    </ >
  );
};

export default CreateBlogPost;