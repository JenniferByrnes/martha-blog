import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'

const blogList = ({ blogPost, id, onEdit, onDelete }) => {

  return (
    // Fills all blog posts
    <>
      {/* Flexbox for each blogPost */}
      <li className="flex justify-center ">
        {/* Card */}
        <div className="w-full m-1">
          {/* Card links to expanded blog post */}
          <Link className="group flex flex-col relative md:flex-row items-center shadow-2xl md:max-w-full rounded-2xl bg-white"
            to={`/single-blog-post/${id}`}
            style={{
              textDecoration: 'none'
            }}
          >
            {/* Optional Image - hidden if non-existant */}
            <img className={blogPost.blogPostImage ? "object-cover md:w-48 md:h-48 mt-2 md:mt-0 rounded-t-lg md:rounded-none md:rounded-l-lg" : 'hidden'}
              alt="Inspiration"
              src={blogPost.blogPostImage}
              width='96px'
              height='96px'
            />
            {/* Blog post text */}
            <div className="group-hover:text-blue-500 p-2 md:p-6 flex flex-col items-center md:items-start">
              {/* Blog post title */}
              <h5 className="group-hover:text-blue-500 text-gray-900 text-xl font-medium mb-2">
                {blogPost.blogPostTitle}
              </h5>
              {/* Blog post body */}
              {/* TODO - get elipsis working for overflow text. */}
              <p className="inline-block group-hover:text-blue-500 text-gray-700 text-base max-h-36 text-ellipsis overflow-hidden ... mb-2 md:mb-4">{blogPost.blogPostText} ...</p>

              {/* Blog post footer (TODO - this doesn't work - "key" problem */}
              {/* <p className="group-hover:text-blue-500 text-gray-600 text-xs">
              {blogPost.timestamp}
            </p> */}

              <div className='absolute top-0 right-2'>
                {onDelete && (
                  <DeleteIcon
                    className='removeIcon'
                    fill='rgb(231, 76,60)'
                    onClick={() => onDelete(blogPost.id, blogPost.name)}
                  />
                )}
                {onEdit &&
                  <EditIcon
                    className='editIcon'
                    onClick={() => onEdit(id)} />}
              </div>
            </div>
          </Link>
        </div>
      </li>
    </>
  );
};

export default blogList;