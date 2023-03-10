import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import GetExistingImageRef from '../components/GetExistingImageRef'
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { v4 } from "uuid";

const EditBlogPost = () => {

  const [blogPostText, setBlogPostText] = useState('');
  const [blogPostTitle, setBlogPostTitle] = useState('');
  const [blogPostOldImageURL, setBlogPostOldImageURL] = useState('');
  // const [blogPost, setBlogPost] = useState('');
  const [userRef, setUserRef] = useState('');

  const [loading, setLoading] = useState(false)

  const auth = getAuth()
  const navigate = useNavigate()
  const params = useParams()
  const isMounted = useRef(true)

  const [selectedImage, setSelectedImage] = useState();


  // Sets userRef to logged in User
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

  // Fetch blogPost to edit
  useEffect(() => {
    setLoading(true)
    const fetchBlogPost = async () => {
      const docRef = doc(db, 'blog', params.blogPostId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        // setBlogPost(docSnap.data())
        setBlogPostText(docSnap.data().blogPostText)
        setBlogPostTitle(docSnap.data().blogPostTitle)
        setBlogPostOldImageURL(docSnap.data().blogPostImage)
        setLoading(false)
      } else {
        navigate('/')
        toast.error('Blog post does not exist')
      }
    }
    fetchBlogPost()
  }, [params.blogPostId, navigate])

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
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Handle file upload event and update state
  // blogImages is the folder where the image will be stored.
  async function storeImage() {
    // Return old image if no new one is selected.
    if (!selectedImage) return blogPostOldImageURL;

    // Store the new image in Storage and get its URL
    return new Promise((resolve, reject) => {
      const storage = getStorage()
      // add characters to the filename to make it unique with v4
      const imageRef = ref(storage, `blogImages/${selectedImage.name + v4()}`);
      // pass in the location and the image
      uploadBytes(imageRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve(url)
          // Clear out the selectedImage value for a potential new one
          setSelectedImage()
        });
      },
        (err) => {
          toast.error('Image not uploaded')
          reject(err)
        }
      );
      // Delete the old image from storage if there is one
      async function deleteOldImage() {
        if (blogPostOldImageURL) {
          
          //Delete the file
          // console.log('before function call blogPostOldImageURL=')
          // console.log(blogPostOldImageURL)
          // This is still inconsistant - the function call fixed one await issue, but it's still inconistant. 
          await deleteObject(GetExistingImageRef(blogPostOldImageURL, storage))
            .then(() => {
              console.log('EditBlogPost Old image deleted');
            })
            .catch((error) => {
              console.error('EditBlogPost Failed to delete image', error);
            });
        }
      }

      deleteOldImage();
    })
  };


  async function handleFormSubmit(e) {
    e.preventDefault()
    try {
      const editedTimestamp = serverTimestamp()
      // Store the image and get the url
      const blogPostImage = await storeImage()

      // Store the record into the collection
      // The names used here are the field names for the collection
      // Await is needed for the storeImage to complete.
      const docRef = doc(db, 'blog', params.blogPostId)
      if (blogPostImage) {
        await updateDoc(docRef, { blogPostTitle, blogPostText, blogPostImage, userRef, editedTimestamp })
      } else {
        await updateDoc(docRef, { blogPostTitle, blogPostText, userRef, editedTimestamp })
      }
      setLoading(false)
      toast.success('BlogPost Updated')
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
          <h2 className="text-4xl inline border-b-4 border-pcCoral">Edit Post</h2>
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
                  {/* preview existing file - replace when new file is selected */}
                  {selectedImage ? (
                    <div className="rounded-2xl shadow-lg max-w-3xl max-h-fit mx-auto" >
                      <img
                        // Get the URL for the new image
                        src={URL.createObjectURL(selectedImage)}
                        className="rounded-xl mx-auto object-fill ..."
                        alt="blog inspiration"
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl shadow-lg max-w-3xl max-h-fit mx-auto" >
                      <img
                        src={blogPostOldImageURL}
                        className="rounded-xl  mx-auto object-fill ..."
                        alt="blog inspiration"
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
                  whitespace-pre-wrap
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

export default EditBlogPost;