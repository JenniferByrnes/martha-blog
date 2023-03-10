
import { NavLink } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'

const blogList = ({ blogPost, id, onEdit, onDelete }) => {

  const blogDate = blogPost.timestamp.toDate().toDateString()
  // Convert edited timestamp in the return if it exists
  const tempEditedTimestamp = blogPost.editedTimestamp

  return (
    // Fills all blog posts
    <>
      {/* Flexbox for each blogPost */}
      <li className="w-full md:flex">
        {/* Card */}
        <div className="w-full m-1">
          {/* Card links to expanded blog post - needed as a relative div for the edit/delete icons */}
          <div className="md:h-48 flex flex-col relative md:flex-row shadow-2xl md:max-w-full rounded-2xl  bg-white"
          >
            <NavLink to={`/single-blog-post/${id}`}
              className="group flex flex-col md:flex-row w-full space-x-1"
              style={{
                textDecoration: 'none'
              }}>
              {/* Optional Image - hidden if non-existant */}
              <img className={blogPost.blogPostImage ? "h-48 w-48 self-center flex-none bg-cover md:rounded-l-2xl overflow-hidden" : 'hidden'}
                alt="Inspiration"
                src={blogPost.blogPostImage}
              />
              {/* Blog post text */}

              <div className="relative w-full h-full p-2 md:p-4 space-y-1 group">
                {/* Blog post title */}
                <h5 className="group-hover:text-blue-500 text-gray-900 text-xl font-medium">
                  {blogPost.blogPostTitle}
                </h5>
                {/* Blog post body */}
                {/* TODO - get elipsis working for overflow text. 
              Problem - whitespace-pre-wrap is needed to contain text in card and display line formatting, but truncate includes whitespace-nowrap (that part won't function to display ellipses) */}
                <p className="inline-block whitespace-pre-wrap group-hover:text-blue-500 text-gray-700 text-base max-h-12 md:max-h-24 truncate">{blogPost.blogPostText}</p>

                {/* Blog post footer */}
                <span className="md:absolute md:bottom-0 md:left-4 group-hover:text-blue-500 text-gray-600 italic text-xs">
                  {blogDate}
                </span>

                {/* Check to see if we have an edit Timestamp - if so, display it */}
                {tempEditedTimestamp
                  ?
                  <span className="md:absolute md:bottom-0 md:left-40 group-hover:text-blue-500 text-gray-600 italic text-xs">   Edited: {tempEditedTimestamp.toDate().toDateString()}</span>
                  : <></>
                }
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