import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config.js'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

const SingleBlogPost = props => {
  const [blogPost, setBlogPost] = useState(null)
  const [blogTimeStamp, setBlogTimeStamp] = useState(null)
  const [blogEditedTimeStamp, setBlogEditedTimeStamp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const fetchBlogPost = async () => {
      // Get the data from the database
      const docRef = doc(db, 'blog', params.blogPostId)
      // Get snapshot from the reference
      const docSnap = await getDoc(docRef)

      // populate the data.
      if (docSnap.exists()) {
        setBlogPost(docSnap.data())
        // TimeStamp needs to be converted to a date string
        setBlogTimeStamp(docSnap.data().timestamp.toDate().toDateString())
        setLoading(false)

        // If we have a Edited Timestamp, prepare to display it
        const tempEditedTimestamp = docSnap.data().editedTimestamp
        if (tempEditedTimestamp !== undefined && tempEditedTimestamp !== null) {
          setBlogEditedTimeStamp(tempEditedTimestamp.toDate().toDateString())
        }
        else {
          setBlogEditedTimeStamp("")
        }
      }
    }
    fetchBlogPost()

  }, [navigate, params.blogPostId])

  if (loading) {
    return <Spinner />
  }

  return (
    // detail view of one post
    <section className=" mx-auto min-h-screen h-full w-screen bg-pcGreen">
      {/* Link copier */}
      <div className="fixed cursor-pointer top-12 right-6 border-radius-50% z-2" onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(() => {
          setShareLinkCopied(false)
        }, 2000)
      }}
      >
        <img src={shareIcon} alt="copy link" />
      </div>
      {shareLinkCopied && <p className='fixed top-12 right-12 z-2'>Link Copied!</p>}

      <br></br>
      {/* Card  */}
      <div className="card mx-6 my-2 bg-white shadow-2xl rounded-2xl">

        {/* Card Image */}
        {/* Check to see if we have an image - if so, display it */}
        {blogPost.blogPostImage
          ?
          <img
            alt="blog inspiration"
            src={blogPost.blogPostImage}
            className="mx-auto bg-white shadow-lg"
          />
          : <></>
        }
        {/* Card Body */}
        <div className="p-2 md:p-6 space-y-2 md:space-y-4">
          <p className="text-2xl font-bold pt-3">{blogPost.blogPostTitle}</p>
          <p className="whitespace-pre-wrap">{blogPost.blogPostText}</p>
          <span className="italic">Posted: {blogTimeStamp}
          </span>
          {/* Check to see if we have an edit Timestamp - if so, display it */}
          {blogEditedTimeStamp
            ?
            <span className="italic whitespace-pre-wrap">   Edited: {blogEditedTimeStamp}</span>
            : <></>
          }
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPost;
