import React from 'react'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy, limit, startAfter, getCountFromServer } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BlogList from '../components/BlogList'

const Blog = () => {

  const [blogPosts, setBlogPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedBlogPost, setLastFetchedBlogPost] = useState(null)
  const [count, setCount] = useState(null)

  useEffect(() => {
    // This runs once to get the first ten Posts
    const fetchBlogPosts = async () => {
      try {
        // Get reference
        const blogPostsRef = collection(db, 'blog')

        // Get the total count for the LoadMore field
        const countQuery = query(
          blogPostsRef,
        );
        const countDocs = await getCountFromServer(countQuery);
        setCount(countDocs.data().count);

        // Create a query for all blog posts - limit to 10
        const q = query(
          blogPostsRef,
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedBlogPost(lastVisible)

        const blogPosts = []


        querySnap.forEach((doc) => {
          return blogPosts.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setBlogPosts(blogPosts)
        setLoading(false)


      } catch (error) {
        toast.error('Could not fetch blogPosts')
      }
    }

    fetchBlogPosts()
  }, [])

  // Pagination / Load More - this gets all after the 1st 10
  const onFetchMoreBlogPosts = async () => {
    try {
      // Get reference
      const blogPostsRef = collection(db, 'blog')

      // Create a query
      const q = query(
        blogPostsRef,
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedBlogPost),
        limit(10)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedBlogPost(lastVisible)

      const blogPosts = []

      querySnap.forEach((doc) => {
        return blogPosts.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setBlogPosts((prevState) => [...prevState, ...blogPosts])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch blogPosts')
    }
  }

  return (
    // Page Container
    <section className=" mx-auto  min-h-full h-screen  w-screen bg-pcGreen">
      {/* Divide the container into columns */}
      <div className="flex flex-col p-6 lg:flex-row justify-between " >

        {/* left column */}
        <div className="flex justify-center lg:h-screen lg:items-center shrink-0">
          {/* Card */}
          <div className="rounded-2xl shadow-lg max-w-sm bg-white">
            {/* Image */}
            <div >
              <img className="rounded-t-xl object-fill h-60 w-96 ..."
                alt="Sample"
                src="https://picsum.photos/300/200"
              />
            </div>
            {/* Card Info below image */}
            <div className="p-6">
              <p className="text-xl font-medium text-center mb-2">
                Card title
              </p>
              <p
                className="mb-2 text-muted text-center"
              >
                Card subtitle
              </p>
              <p className="text-center leading-5 tracking-wide">
                Some quick example text to build on the card title and make up the bulk of the card‘s content.
              </p>
            </div>
          </div>
        </div>

        {/* Right section of container */}
        <div className="flex-grow shrink ">
          {/* Column for blog posts */}
          <div className="justify-space-between ">
            {/* Blog articles for all users once they are selected. */}
            <div className={`mx-5`}>
              {loading ? (
                <Spinner />
              ) : (
                <ul>
                  {blogPosts.map((blogPost) => (
                    <BlogList
                      blogPost={blogPost.data}
                      id={blogPost.id}
                      key={blogPost.id}
                    />
                  ))}
                </ul>
              )}
            </div>
            <br />
            <br />
            {/* Show Load More if there are more posts */}
            {lastFetchedBlogPost && blogPosts?.length < count && (
               <p className="" onClick={onFetchMoreBlogPosts}>Load More</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;