import React, { useState } from 'react';
import BlogImage from '../BlogImage';

const BlogPostForm = () => {

  const [blogPostText, setThoughtText] = useState('');
  const [blogPostTitle, setThoughtTitle] = useState('');
  const [blogPostImage, setThoughtImage] = useState('');

  const handleImage = savedURL => {
    setThoughtImage(savedURL);
  }

  //const [addThought, { error }] = useMutation(ADD_THOUGHT, {
  //  update(cache, { data: { addThought } }) {

      // could potentially not exist yet, so wrap in a try/catch
  //    try {
        // update me array's cache
  //      const { me } = cache.readQuery({ query: QUERY_ME });
  //      cache.writeQuery({
  //        query: QUERY_ME,
  //        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
  //      });
  //    } catch (e) {
  //      console.warn("First post!")
  //    }

      // update thought array's cache
  //    const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
  //    cache.writeQuery({
  //      query: QUERY_THOUGHTS,
  //      data: { thoughts: [addThought, ...thoughts] },
  //    });
  //  }
  //});

  const handleChange = event => {
    setThoughtText(event.target.value);
  };

  const handleChangeTitle = event => {
    setThoughtTitle(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

  //  try {
      // add thought to database
  //    await addThought({
  //      variables: { blogPostTitle, blogPostImage, blogPostText }
  //    });

      // clear form value
  //    setThoughtText('');
  //    setThoughtTitle('');
  //    setThoughtImage('');

  //  } catch (e) {
  //    console.error(e);
  //  }
  //};

  return (
    // Container for new blog post
    <div className="flex justify-center">
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
              <label for="title1" className="block mb-2 text-sm font-medium ">Blog Post Title</label>
              <input type="text" name="title1" id="blogPostTitle" className="  border-2 border-pcGreen w-full p-3 mb-4 focus: outline-pcGreen rounded"
                onChange={handleChangeTitle}
              />
            </div>
          </div>
          {/* This is the blog text */}
          <div classname="row">
            <div className="form-group mb-6">
              <label for="text" className="block mb-2 text-sm font-medium ">Blog Content</label>
              <textarea className="block      
                  w-full
                  bg-clip-padding
                  border-2 border-pcGreen p-3 mb-4 
                  focus: outline-pcGreen
                  rounded "
                id="blogPostText"
                rows="5"
                name="text"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* This is the submit button */}
          <div className="flex justify-center">
            <button type="submit" className="form-button max-w-fit px-4">Submit</button>
          </div>
        </form>
      </div >
    </div >
  );
};
}
export default BlogPostForm;