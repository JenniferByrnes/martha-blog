import React from 'react'

import BlogList from '../components/BlogList'
import { useAuthStatus } from '../hooks/useAuthStatus'
import BlogPostForm from '../components/BlogPostForm'

const Blog = () => {
  const { loggedIn, loading } = useAuthStatus()

  // use useQuery hook to make query request
//  const { loading, data } = useQuery(QUERY_THOUGHTS);

//  const thoughts = data?.thoughts || [];
//  console.log(thoughts);

  return (
    // Page Container
    <section className="container mx-auto p-6 ">
      {/* Divide the container into columns */}
      <div className="flex flex-col md:flex-row justify-between " >

        {/* left column */}
        <div className="flex justify-center md:h-screen md:items-center shrink-0">
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
            {/* Check if user is logged in */}
            {loggedIn && (
              <div className="mb-3 ">
                {/* logged in user can add post */}
                <BlogPostForm />
              </div>
            )}
            {/* Blog articles for all users. */}
            {/* Why is loggedIn part of this className??? */}
            {/* Does it display the name???? */}
            {/* Not sure that this works.... */}
            <div className={`mx-5 ${loggedIn}`}>
              {loading ? (
                <div>Loading...</div>
              ) : (
//                <BlogList thoughts={thoughts} />
<p>Hello World</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;