import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { v4 } from "uuid";

const EditBlogPost = () => {
  const [blogPostText, setBlogPostText] = useState('');
  const [blogPostTitle, setBlogPostTitle] = useState('');
  const [blogPostImage, setBlogPostImage] = useState('');
  const [userRef, setUserRef] = useState('');

  const [loading, setLoading] = useState(false)
  const [blogPost, setBlogPost] = useState(false)

  const params = useParams()

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageName, setSelectedImageName] = useState();

  // Get the single blog post to edit from the database
  useEffect(() => {
    setLoading(true)
    // Fetch blog post to edit
    const fetchBlogPost = async () => {
      const docRef = doc(db, 'blog', params.blogPostId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setBlogPost(docSnap.data())
        setBlogPostText(docSnap.data());
        setBlogPostTitle(docSnap.data());
        setBlogPostImage(docSnap.data());
        setLoading(false)

      } else {
        navigate('/')
        toast.error('Post does not exist.')
      }
    }
    fetchBlogPost()
  }, [params.blogPostId, navigate])


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

      console.log("JKB imageChange selectedImageName=")
      console.log(selectedImageName)
      console.log("JKB imageChange selectedImage=")
      console.log(selectedImage)
    }
  };

  // Handle file upload event and update state
  // blogImages is the folder where the image will be stored.
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    console.log("JKB handleformsubmit")

    const storeImage = async (selectedImage) => {
      console.log("**** IN storeImage ****")
      console.log("JKB selectedImage=")
      console.log(selectedImage)
      if (selectedImage.name) {

        return new Promise((resolve, reject) => {
          console.log("**** IN Promise ****")
          console.log("JKB selectedImage=")
          console.log(selectedImage)
          const storage = getStorage()
          console.log("JKB storage=")
          console.log(storage)
          console.log("JKB selectedImage.name=")
          console.log(selectedImage.name)
          // add characters to the filename to make it unique with v4
          const imageRef = ref(storage, `blogImages/${selectedImage.name + v4()}`);
          console.log("JKB imageRef=")
          console.log(imageRef)
          // pass in the location and the image
          const uploadTask = uploadBytesResumable(imageRef, selectedImage)

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
                setBlogPostImage((url))
                setSelectedImage('')
                console.log('blogPostImage=')
                console.log(blogPostImage)
                console.log('url=')
                console.log(url)
                console.log('imageRef=')
                console.log(imageRef)
              });

            },
            (err) => {
              reject(err)
            },
            () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log('File available at ', url);
                console.log('blogPostImage=')
                console.log(blogPostImage)
                console.log('url=')
                console.log(url)
              });
            });
        })
      }
    };

    const imgUrls = await new Promise((image) => storeImage(image))
      .catch(() => {
        setLoading(false)
        toast.error('Image not uploaded')
        return
      })

    console.log(blogPostTitle, blogPostText,
      blogPostImage)

    const timestamp = serverTimestamp()

    // Update post
    const docRef = doc(db, 'blog', params.blogPostId)
    await updateDoc( blogPostTitle, blogPostText, blogPostImage, userRef, timestamp )
    setLoading(false)
    toast.success('BlogPost edited')
    navigate(`/blog`)
  };

  return (
    // Container for new blog post
    <>
      <header className="flex justify-center">
        <p>Edit a BlogPost</p>
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
                  <div
                    // onClick={storeImage}
                    className="hidden"
                  > Save file.</div>
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

export default EditBlogPost;