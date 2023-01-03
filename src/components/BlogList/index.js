import React from 'react';
import { Link } from 'react-router-dom';

const blogList = ({ blogPosts }) => {
  if (!blogPosts.length) {
    return <h3>No Blogs Yet</h3>;
  }

  return (
    // Fills all blog posts
    <>
      {/* if there are blog posts, map through them */}
      {blogPosts &&
        blogPosts.map(blogPost => (
          // Flexbox for each blogPost
          <div key={blogPost._id} className="flex justify-center ">
            {/* Card */}
            <div className="w-full m-1">
              {/* Card links to expanded blog post */}
              {/* <Link className="group flex flex-col md:flex-row items-center shadow-2xl md:max-w-full rounded-2xl bg-white"
                to={`/blogPost/${blogPost._id}`}
                style={{
                  textDecoration: 'none'
                }}
              > */}
                {/* Optional Image */}
                <img className="object-cover md:w-48 md:h-48 mt-2 md:mt-0 rounded-t-lg md:rounded-none md:rounded-l-lg"
                  alt="Sample"
                  src={blogPost.blogPostImage}
                  width='96px'
                  height='96px'
                />
                {/* Blog post text */}
                <div class="group-hover:text-blue-500 p-2 md:p-6 flex flex-col items-center md:items-start">
                  {/* Blog post title */}
                  <h5 class="group-hover:text-blue-500 text-gray-900 text-xl font-medium mb-2">
                    {blogPost.blogPostTitle}
                  </h5>
                  {/* Blog post body */}
                  <p className="group-hover:text-blue-500 text-gray-700 text-base mb-2 md:mb-4">{blogPost.blogPostText}</p>

                  {/* Blog post footer */}
                  <p className="group-hover:text-blue-500 text-gray-600 text-xs">
                    {blogPost.createdAt}
                  </p>
                </div>
              {/* </Link> */}
            </div>
          </div>
        ))}
    </>
  );
};

export default blogList;