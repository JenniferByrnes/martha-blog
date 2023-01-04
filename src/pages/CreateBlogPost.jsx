import React, { useState, useEffect, useRef } from 'react';
import BlogImage from '../components/BlogImage';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const CreateBlogPost = () => {
  console.log("in CREATE BLOG POST")
  const [blogPostText, setBlogPostText] = useState('');
  const [blogPostTitle, setBlogPostTitle] = useState('');
  const [blogPostImage, setBlogPostImage] = useState('');
  const [userRef, setUserRef] = useState('');
  // const [formData, setFormData] = useState({
  //   blogPostText: '',
  // blogPostTitle: '',
  // blogPostImage: ''
  // })

  // const {
  //   text,
  // title,
  // image
  // } = formData

  const [loading, setLoading] = useState(false)

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const handleImage = savedURL => {
    setBlogPostImage(savedURL);
  }

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        console.log("in CREATE BLOG POST - authState")
        console.log(user.uid)
        if (user) {
          setUserRef(user.uid)
        } else {
          navigate('/login')
        }
      })
    }
    return () => {
      console.log("in CREATE BLOG POST - isMounted.current")
      console.log(isMounted.current)
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  if (loading) {
    console.log("in CREATE BLOG POST - loading")
    console.log(loading)
    return <Spinner />
  }
  //const [addBlogPost, { error }] = useMutation(ADD_THOUGHT, {
  //  update(cache, { data: { addBlogPost } }) {

  // could potentially not exist yet, so wrap in a try/catch
  //    try {
  // update me array's cache
  //      const { me } = cache.readQuery({ query: QUERY_ME });
  //      cache.writeQuery({
  //        query: QUERY_ME,
  //        data: { me: { ...me, blogPosts: [...me.blogPosts, addBlogPost] } },
  //      });
  //    } catch (e) {
  //      console.warn("First post!")
  //    }

  // update blogPost array's cache
  //    const { blogPosts } = cache.readQuery({ query: QUERY_THOUGHTS });
  //    cache.writeQuery({
  //      query: QUERY_THOUGHTS,
  //      data: { blogPosts: [addBlogPost, ...blogPosts] },
  //    });
  //  }
  //});

  const handleChangeText = event => {
    setBlogPostText(event.target.value);
  };

  const handleChangeTitle = event => {
    setBlogPostTitle(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
  };

  //  try {
  // add blogPost to database
  //    await addBlogPost({
  //      variables: { blogPostTitle, blogPostImage, blogPostText }
  //    });

  // clear form value
  //    setBlogPostText('');
  //    setBlogPostTitle('');
  //    setBlogPostImage('');

  //  } catch (e) {
  //    console.error(e);
  //  }
  //};

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    // Container for new blog post
    <div>
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
        <form onSubmit={onSubmit}></form>
      </main>

    </div >
  );
};

export default CreateBlogPost;