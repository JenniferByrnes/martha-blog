import { useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config.js'
import { getAuth } from 'firebase/auth'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

const SingleBlogPost = props => {
    const [blogPost, setBlogPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)
  
    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()
  
    useEffect(() => {
      const fetchBlogPost = async () => {
        // Get the data from the database
        const docRef = doc(db, 'blog', params.blogPostId)
        // Get snapshot from the reference
        const docSnap = await getDoc(docRef)
  
        // populate the data.
        if (docSnap.exists()) {
          setBlogPost(docSnap.data())
          setLoading(false)
        }
      }
  
      fetchBlogPost()
    }, [navigate, params.blogPostId])
  
    if (loading) {
      return <Spinner />
    }

  return (
    // detail view of one post
    <section className="container mx-auto p-6 ">
      {/* Card  */}
      <div className="card mb-3 bg-white shadow-2xl rounded-2xl">

        {/* Card Image */}
        <img
          alt="blog inspiration"
          src={blogPost.blogPostImage}
          className="mx-auto bg-white shadow-lg "
        />
        {/* Card Body */}
        <div className="text-center">
          <p className="text-2xl py-3">{blogPost.blogPostTitle}</p>
          <p>{blogPost.blogPostText}</p>
          <p className="text-start pt-3 italic">
            {blogPost.createdAt}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPost;
