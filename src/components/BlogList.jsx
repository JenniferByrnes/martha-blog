import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'

const blogList = ({ blogPost, id, onEdit, onDelete }) => {
  const blogDate = blogPost.timestamp.toDate().toDateString()

  return (
    // Fills all blog posts
    <>
      {/* Flexbox for each blogPost */}
      <li className="w-full md:max-w-full md:flex">
        {/* Card */}
        <div className="w-full m-1">
          {/* Card links to expanded blog post */}
          <div className="md:h-48 group flex flex-col relative md:flex-row items-center shadow-2xl md:max-w-full rounded-2xl space-x-1 bg-white"
          >
            {/* Optional Image - hidden if non-existant */}
            <img className={blogPost.blogPostImage ? "h-48 w-48 flex-none bg-cover md:rounded-l-2xl text-center overflow-hidden" : 'hidden'}
              alt="Inspiration"
              src={blogPost.blogPostImage}
            />
            {/* Blog post text */}
            <NavLink to={`/single-blog-post/${id}`}
              style={{
                textDecoration: 'none'
              }}>
              <div className="group-hover:text-blue-500 p-2 md:p-6 flex flex-col justify-between leading-normal">
                {/* Blog post title */}
                <h5 className="group-hover:text-blue-500 mt-5 text-gray-900 text-xl font-medium mb-2">
                  {blogPost.blogPostTitle}
                </h5>
                {/* Blog post body */}
                {/* TODO - get elipsis working for overflow text. 
              Problem - whitespace-pre-wrap is needed to contain text in card and display line formatting, but truncate includes whitespace-nowrap (that part won't function to display ellipses) */}
                <p className="inline-block whitespace-pre-wrap group-hover:text-blue-500 text-gray-700 text-base max-h-36 truncate mb-2 md:mb-4">{blogPost.blogPostText}</p>

                {/* Blog post footer TODO  */}
                <p className="group-hover:text-blue-500 text-gray-600 italic text-xs">
                  {blogDate}
                </p>
              </div>
            </NavLink>
            <div className='absolute top-0 right-2 z-20'>
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
        </div>
      </li>
    </>
  );
};

export default blogList;