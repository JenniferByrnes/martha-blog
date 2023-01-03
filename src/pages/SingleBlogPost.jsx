import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config.js'

import Auth from '../utils/auth';

const SingleThought = props => {

  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // detail view of one post
    <section className="container mx-auto p-6 ">
      {/* Card  */}
      <div className="card mb-3 bg-white shadow-2xl rounded-2xl">

        {/* Card Image */}
        <img
          alt="blog inspiration"
          src={thought.blogPostImage}
          className="mx-auto "
        />
        {/* Card Body */}
        <div className="text-center">
          <p className="text-2xl py-3">{thought.blogPostTitle}</p>
          <p>{thought.blogPostText}</p>
          <p className="text-start pt-3 italic">
            {thought.createdAt}
          </p>
        </div>
      </div>
      {Auth.loggedIn()}
    </section>
  );
};

export default SingleThought;
